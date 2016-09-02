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
            var chip = "<div class=\"custom-chip custom-chip-enable\" id=\"chip-#name#\" title=\"#name#\">#name# : #value#";
            chip += "</div>";
            chip = chip.replace(/#name#/g, name);
            chip = chip.replace("#value#", value);
            var container = ui.$("#chip-container");
            container.append(chip);
            if(removable && removeCallback && typeof removeCallback === "function") {
                var btn = ui.$("#chip-" + name);
                btn.bind("click", function () {

                    removeCallback();

                    if(ui.$("#chip-" + name).hasClass('custom-chip-enable')) {
                        ui.$("#chip-" + name).removeClass('custom-chip-enable').addClass('custom-chip-disable');
                    }
                    else {
                        ui.$("#chip-" + name).removeClass('custom-chip-disable').addClass('custom-chip-enable');
                    }
                });
            }
        };


        var site = scrapperParams.site || scrapperParams.level2.site;
        var level2 = scrapperParams.level2 ? scrapperParams.level2.level2 : null;

        var apiCaller = new ApiCaller($);
        var siteInfos = new SiteInfos(apiCaller, {"Authorization": "Token " + token});

        var placeHolders = [];

        var draw = function() {
            items.forEach(function (item) {
                item.onClose = onClose;
                item.token = token;
                item.scrapperParams = Tools.clone(scrapperParams);
                var pl = new PlaceHolderCtrl(item);
                placeHolders.push(pl);
            })
        };

        var refresh = function(param) {
            placeHolders.forEach(function (ph) {
                ph.refresh(param);
            })
        };


        var changeFilter = function (param) {

            return function () {
                // if (filterKey !== "level2.level2") {
                //     delete scrapperParams[filterKey];
                // } else {
                //     scrapperParams.site = scrapperParams.level2.site;
                //     delete scrapperParams.level2;
                // }
                // var finalQuery = queryGen.getQuery(scrapperParams, gIsMinute);
                refresh(param);
            };
        };

        siteInfos.getSiteInfos(site, level2, function (res) {
            for (var param in scrapperParams) {
                if (scrapperParams.hasOwnProperty(param)) {
                    if (typeof scrapperParams[param] === "object") {
                        var objParam = scrapperParams[param];
                        for (var objKey in objParam) {
                            if (objParam.hasOwnProperty(objKey)) {
                                addChips(objKey, res[objKey] || objParam[objKey], objKey !== "site",changeFilter);
                            }
                        }
                    } else {
                        addChips(param, res[param] || scrapperParams[param], true, changeFilter);
                    }
                }
            }
        });



        draw();

    };

    var onClose = function (callback) {
        onCloseCallbacks.push(callback);
    };

    return {
        "initialize": initialize,
        "onClose": onClose
    };
})();
