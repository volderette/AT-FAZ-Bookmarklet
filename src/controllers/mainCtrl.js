var mainCtrl = (function() {
    var ui, $, onCloseCallbacks = [], onChangePeriodCallbacks = [];
    var topOffset = 10;

    var tabs = [];
    var tabsInstances = [];
    
    var initialize = function(artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        tabs.push(
            {
                container: ui.$("#tabContent1"),
                baseQuery: "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}&period={R:{D:0}}"
            },
            {
                container: ui.$("#tabContent2"),
                baseQuery: "query2"
            },
            {
                container: ui.$("#tabContent3"),
                baseQuery: "query3"
            });

        ui.$("#btn-close").bind("click", function() {
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
        });

        ui.$("#btn-disconnect").bind("click", function() {
            authentication.disconnectUser();
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
        });

        ui.$("#btn-hide,#minimized-logo").bind("click", function() {
            ui.$("#widget-container").toggleClass("minimized");
        });

        ui.$("#btn-switch-period").bind("click", function() {
            var btnJq = $(this);
            btnJq.toggleClass("toggle-switched-right");
            var isHour = btnJq.hasClass("toggle-switched-right");
            ui.$("#graph-title").text(isHour ? "Today" : "Last hour");
            btnJq.attr({title: isHour ? "Last hour" : "Today"});
            onChangePeriodCallbacks.forEach(function (callback) {
                callback();
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

    var onClose = function(callback) {
        onCloseCallbacks.push(callback);
    };

    var onChangePeriod = function(callback) {
        onChangePeriodCallbacks.push(callback);
    };

    var setDraggable = function() {
        try {
            ui.$("#widget-container").draggable({
                handle: ui.$("#maximized-nav,#minimized-logo")
            });
        } catch (ex) {
            console.log("Draggable disabled");
            console.log(ex);
        }
    };

    var clearChips = function() {
        ui.$("#chip-container").empty();
    };

    var addChips = function(name, value, removable, removeCallback) {
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
            btn.bind("click", function() {
                removeCallback();
                ui.$("#chip-" + name).remove();
            });
        }
    };

    return {
        "initialize": initialize,
        "onClose": onClose,
        "onChangePeriod": onChangePeriod,
        "clearChips": clearChips,
        "addChips": addChips
    };
})();
