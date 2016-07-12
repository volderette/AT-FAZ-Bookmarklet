;(function ($, undefined) {

    //bootstrap function

    var ui = new artoo.ui({
        stylesheets: ["src\css\global.css", "src\css\login.css", "src\css\main.css", "src\css\tab.css"]
    });

    var apiCaller = new ApiCaller($);

    var authentication = new Authentication(apiCaller);

    loginCtrl.initialize(ui, $, authentication,
        function (token) {

            loginCtrl.hide();

            ui.$().append(artoo.templates["src\templates\main.tpl"]);

            var loader = ui.$("#loader");
            var scheduler = new Scheduler(loader);

            mainCtrl.initialize(ui, $, authentication);
            mainCtrl.onClose(function () {
                scheduler.stop();
            });
            mainCtrl.onChangePeriod(function (isHour) {
                scheduler.stop();
                startLoading(!isHour);
            });

            var scrapper = new TagScrapper();
            var queryGen = new QueryGenerator();
            var apiCaller = new ApiCaller($);
            var siteInfos = new SiteInfos(apiCaller, {"Authorization": "Token " + token});
            var drawer, gIsMinute;
            var scrapperParams = scrapper.getParamsFromTag();

            var startLoading = function (isMinute) {
                gIsMinute = isMinute;
                createChips(scrapperParams);
                var finalQuery = queryGen.getQuery(scrapperParams, isMinute);
                var graphContainer = ui.$("#graph-container");

                if (drawer) {
                    drawer.clear();
                }
                drawer = new ChartDrawer($, graphContainer);
                launchLoad(finalQuery);
            };

            var launchLoad = function (query) {
                scheduler.start(function () {
                    apiCaller.call(query, {"Authorization": "Token " + token}, function (res) {
                        drawer.draw(res);
                        scheduler.restart();
                    }, function (err) {
                        scheduler.stop();
                        console.log(err);
                    });
                }, 15000);
            };

            var createChips = function (scrapperParams) {
                mainCtrl.clearChips();
                var site = scrapperParams.site || scrapperParams.level2.site;
                var level2 = scrapperParams.level2 ? scrapperParams.level2.level2 : null;
                siteInfos.getSiteInfos(site, level2, function (res) {
                    for (var param in scrapperParams) {
                        if (scrapperParams.hasOwnProperty(param)) {
                            if (typeof scrapperParams[param] === "object") {
                                var objParam = scrapperParams[param];
                                for (var objKey in objParam) {
                                    if (objParam.hasOwnProperty(objKey)) {
                                        mainCtrl.addChips(objKey, res[objKey] || objParam[objKey], objKey !== "site", removeFilter(param + "." + objKey));
                                    }
                                }
                            } else {
                                mainCtrl.addChips(param, res[param] || scrapperParams[param], true, removeFilter(param));
                            }
                        }
                    }
                });

            };

            var removeFilter = function (filterKey) {
                return function () {
                    if (filterKey !== "level2.level2") {
                        delete scrapperParams[filterKey];
                    } else {
                        scrapperParams.site = scrapperParams.level2.site;
                        delete scrapperParams.level2;
                    }
                    scheduler.stop();
                    var finalQuery = queryGen.getQuery(scrapperParams, gIsMinute);
                    launchLoad(finalQuery);
                };
            };

            startLoading(true);
        },
        function (err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
        });

}).call(this, artoo.$);
