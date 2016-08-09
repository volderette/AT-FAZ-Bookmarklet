var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [], onChangePeriodCallbacks = [];

    var tabs = [];
    var tabsInstances = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        tabs.push(
            {
                container: ui.$("#tabContent1"),
                baseQuery: "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}",
                drawer: new LineDrawer($)
            },
            {
                container: ui.$("#tabContent2"),
                baseQuery: "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Referrers"})
            },
            {
                container: ui.$("#tabContent3"),
                baseQuery: "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($),
                isSummary:true
            }
        );

        ui.$("#btn-close").bind("click", function () {
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
        });

        ui.$("#btn-disconnect").bind("click", function () {
            authentication.disconnectUser();
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
        });

        ui.$("#btn-hide,#minimized-logo").bind("click", function () {
            ui.$("#widget-container").toggleClass("minimized");
        });

        ui.$("#btn-switch-period").bind("click", function () {
            var btnJq = $(this);
            btnJq.toggleClass("toggle-switched-right");
            var isHistorical = btnJq.hasClass("toggle-switched-right");
            ui.$("#graph-title").text(isHistorical ? "From article begin" : "Today");
            btnJq.attr({title: isHistorical ? "Today" : "From article begin"});
            onChangePeriodCallbacks.forEach(function (callback) {
                callback(isHistorical);
            });
        });

        if (!authentication.isConnectionKept()) {
            ui.$("#btn-disconnect").hide();
        }

        var scrapper = new TagScrapper();

        tabs.forEach(function (tab) {
            tab.onClose = onClose;
            tab.onChangePeriod = onChangePeriod;
            tab.token = token;
            tab.scrapper = scrapper;
            var tabInstance = new TabCtrl(tab);
            tabsInstances.push(tabInstance);
        })
    };

    var onClose = function (callback) {
        onCloseCallbacks.push(callback);
    };

    var onChangePeriod = function (callback) {
        onChangePeriodCallbacks.push(callback);
    };

    var clearChips = function () {
        ui.$("#chip-container").empty();
    };

    var addChips = function (name, value, removable, removeCallback) {
        var chip = "<div class=\"chip\" id=\"chip-#name#\" title=\"#name#\">#name# : #value#";
        if (removable) {
            chip += "<button type=\"button\" class=\"btn-header right\" title=\"Remove filter\" id=\"btn-remove-filter-#name#\">×</button>";
        }
        chip += "</div>";
        chip = chip.replace(/#name#/g, name);
        chip = chip.replace("#value#", value);
        var container = ui.$("#chip-container");
        container.append(chip);
        if (removable && removeCallback) {
            var btn = ui.$("#btn-remove-filter-" + name);
            btn.bind("click", function () {
                removeCallback();
                ui.$("#chip-" + name).remove();
            });
        }
    };

    return {
        "initialize": initialize,
        "clearChips": clearChips,
        "addChips": addChips,
        "onClose": onClose,
        "onChangePeriod": onChangePeriod
    };
})();
