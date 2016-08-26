var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [];

    var items = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        items.push(
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}&period={R:{D:0}}",
                drawer: new LineDrawer($,ui.$("#placeHolder1"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&period={R:{D:0}}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Referrers"}, ui.$("#placeHolder2"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}&period={R:{D:0}}",
                drawer: new SummaryDrawer($, {title : "Today:"}, ui.$("#placeHolder3"))
            }
        );

        ui.$("#btn-close").bind("click", function () {
            try {
                onCloseCallbacks.forEach(function (callback) {
                    callback();
                });
                ui.kill();
            }
            catch (ex){};
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

        if (!authentication.isConnectionKept()) {
            ui.$("#btn-disconnect").hide();
        }

        var scrapper = new TagScrapper();
        var scrapperParams = scrapper.getParamsFromTag();

        var clearChips = function () {
            ui.$("#chip-container").empty();
        };

        var addChips = function (name, value, removable, removeCallback) {
            var chip = "<div class=\"chip\" id=\"chip-#name#\" title=\"#name#\">#name# : #value#";
            if(removable){
                chip += "<button type=\"button\" class=\"btn-header right\" title=\"Remove filter\" id=\"btn-remove-filter-#name#\">×</button>";
            }
            chip += "</div>";
            chip = chip.replace(/#name#/g, name);
            chip = chip.replace("#value#", value);
            var container = ui.$("#chip-container");
            container.append(chip);
            if(removable && removeCallback) {
                var btn = ui.$("#btn-remove-filter-" + name);
                btn.bind("click", function () {
                    removeCallback();
                    ui.$("#chip-" + name).remove();
                });
            }
        };


        var site = scrapperParams.site || scrapperParams.level2.site;
        var level2 = scrapperParams.level2 ? scrapperParams.level2.level2 : null;

        siteInfos.getSiteInfos(site, level2, function (res) {
            for (var param in scrapperParams) {
                if (scrapperParams.hasOwnProperty(param)) {
                    if (typeof scrapperParams[param] === "object") {
                        var objParam = scrapperParams[param];
                        for (var objKey in objParam) {
                            if (objParam.hasOwnProperty(objKey)) {
                                addChips(objKey, res[objKey] || objParam[objKey], objKey !== "site", removeFilter(param + "." + objKey));
                            }
                        }
                    } else {
                        addChips(param, res[param] || scrapperParams[param], true, removeFilter(param));
                    }
                }
            }
        });

        items.forEach(function (item) {
            item.onClose = onClose;
            item.token = token;
            item.scrapperParams = Tools.clone(scrapperParams);
            new PlaceHolderCtrl(item);
        })
    };

    var onClose = function (callback) {
        onCloseCallbacks.push(callback);
    };

    return {
        "initialize": initialize,
        "onClose": onClose
    };
})();
