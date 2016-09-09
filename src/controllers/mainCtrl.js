var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [];

    var items = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        items.push(
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}#evo#",
                drawer: new LineDrawer($, ui.$("#placeHolder1"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Referrers"}, ui.$("#placeHolder2"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($, {title: "Summary:"}, ui.$("#placeHolder3"))
            }
        );

        ui.$("#btn-close").bind("click", function () {
            try {
                onCloseCallbacks.forEach(function (callback) {
                    callback();
                });
                ui.kill();
            }
            catch (ex) {
            }
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
        var filteredParams = "";

        var clearChips = function () {
            ui.$("#chip-container").empty();
        };

        var addChips = function (name, separator, value, removable, key) {

            var chip = "<div class=\"custom-chip custom-chip-enable\" id=\"chip-#name#\" title=\"#title#\">#name##separator# #value#";
            chip += "</div>";
            chip = chip.replace("#title#", value);
            chip = chip.replace(/#name#/g, name);
            chip = chip.replace(/#separator#/g, separator);
            if (value.length > 25) {
                value = value.substring(0, 22) + "...";
            }
            chip = chip.replace("#value#", value);

            var container = ui.$("#chip-container");
            container.append(chip);

            var jqChip = ui.$("#chip-" + name);

            if (removable && key) {
                jqChip.bind("click", function () {
                    if (jqChip.hasClass('custom-chip-enable')) {
                        jqChip.removeClass('custom-chip-enable').addClass('custom-chip-disable');
                        changeFilter(key, "off");
                    }
                    else {
                        jqChip.removeClass('custom-chip-disable').addClass('custom-chip-enable');
                        changeFilter(key, "on");
                    }
                });
            }
            else {
                jqChip.addClass('custom-chip-readonly');
            }
        };


        var site = scrapperParams.site || scrapperParams.level2.site;
        var level2 = scrapperParams.level2 ? scrapperParams.level2.level2 : null;

        var apiCaller = new ApiCaller($);
        var siteInfos = new SiteInfos(apiCaller, {"Authorization": "Token " + token});

        var placeHolders = [];

        var draw = function () {
            items.forEach(function (item) {
                item.onClose = onClose;
                item.token = token;
                item.scrapperParams = Tools.clone(scrapperParams);
                var pl = new PlaceHolderCtrl(item);
                placeHolders.push(pl);
            })
        };

        var refresh = function (param) {
            placeHolders.forEach(function (ph) {
                ph.refresh(param);
            })
        };

        var setTitle = function (value) {
            ui.$("#mainTitle").text(value);
        };

        var changeFilter = function (filterKey, mode) {

            if (filteredParams === "") {
                filteredParams = Tools.clone(scrapperParams);
            }

            if (mode === "off") {
                if (filterKey.toLowerCase() === "today") {
                    //force D-7
                    var start = Tools.convertDateToString(Tools.getDayFromToday(-7));
                    var end = Tools.convertDateToString(Tools.getDayFromToday(-1));
                    filteredParams.period = "{D:{start:'"+start+"',end:'"+end+"'}}";
                    filteredParams.evo = "{D}";
                }
                else if (filterKey !== "level2.level2") {
                    delete filteredParams[filterKey];
                } else {
                    filteredParams.site = filteredParams.level2.site;
                    delete filteredParams.level2;
                }
            } else {
                if (filterKey.toLowerCase() === "today") {
                    filteredParams.period = "{R:{D:0}}";
                    filteredParams.evo = "{H}";
                }
                else if (filterKey !== "level2.level2") {
                    filteredParams[filterKey] = scrapperParams[filterKey];
                } else {
                    filteredParams.level2 = scrapperParams.level2;
                    delete filteredParams.site;
                }
            }

            refresh(filteredParams);
        };

        ui.$("#switchTime").click(function() {

            if (filteredParams === "") {
                filteredParams = Tools.clone(scrapperParams);
            }

            var $this = $(this);
            if ($this.is(':checked')) {
                //force D-7
                var start = Tools.convertDateToString(Tools.getDayFromToday(-7));
                var end = Tools.convertDateToString(Tools.getDayFromToday(-1));
                filteredParams.period = "{D:{start:'"+start+"',end:'"+end+"'}}";
                filteredParams.evo = "{D}";
            } else {
                filteredParams.period = "{R:{D:0}}";
                filteredParams.evo = "{H}";
            }

            refresh(filteredParams);

        });

        siteInfos.getSiteInfos(site, level2, function (res) {
            for (var param in scrapperParams) {
                if (scrapperParams.hasOwnProperty(param)) {
                    if (typeof scrapperParams[param] === "object") {
                        var objParam = scrapperParams[param];
                        for (var objKey in objParam) {
                            if (objParam.hasOwnProperty(objKey)) {
                                if(objKey.toLowerCase()!="site") {
                                    addChips(objKey, ":", res[objKey] || objParam[objKey], objKey !== "site", param + "." + objKey);
                                }
                                else {
                                    setTitle(res[objKey]);
                                }
                            }
                        }
                    } else {
                        if(param.toLowerCase()!="site") {
                            addChips(param, ":", res[param] || scrapperParams[param], true, param);
                        }
                        else {
                            setTitle(res[param]);
                        }
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
})
();
