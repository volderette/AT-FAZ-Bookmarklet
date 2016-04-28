;(function ($, undefined) {

    var ui = new artoo.ui({
        stylesheets: ['login.css','bookmark.css', 'materialize.css']
    });

    var apiCaller = new ApiCaller($);

    var authentication = new Authentication(apiCaller);

    atLogin.initialize(ui, $, authentication,
        function (token) {

            atLogin.hide();

            ui.$().append(artoo.templates['bookmark.tpl']);

            var loader = ui.$("#loader");
            var scheduler = new Scheduler(loader);

            atWidget.initialize(ui, $);
            atWidget.onClose(function () {
                scheduler.stop();
            });
            atWidget.onChangePeriod(function (isHour) {
                scheduler.stop();
                startLoading(!isHour);
            });

            var scrapper = new TagScrapper();
            var queryGen = new QueryGenerator();
            var drawer, gIsMinute, gScrapperParams;

            var startLoading = function (isMinute) {
                gIsMinute = isMinute;
                var scrapperParams = scrapper.getParamsFromTag();
                gScrapperParams = scrapperParams;
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
                    apiCaller.call(query, {"Authorization": "Token "+token}, function (res) {
                        drawer.draw(res);
                        scheduler.restart();
                    }, function (err) {
                        scheduler.stop();
                        console.log(err);
                    });
                }, 5000);
            };

            var createChips = function (scrapperParams) {
                atWidget.clearChips();
                for (var param in scrapperParams) {
                    if (scrapperParams.hasOwnProperty(param)) {
                        if (typeof scrapperParams[param] === "object") {
                            var objParam = scrapperParams[param];
                            for (var objKey in objParam) {
                                if (objParam.hasOwnProperty(objKey)) {
                                    atWidget.addChips(objKey, objParam[objKey], objKey !== "site", removeFilter(param + "." + objKey));
                                }
                            }
                        } else {
                            atWidget.addChips(param, scrapperParams[param], true, removeFilter(param));
                        }
                    }
                }
            };

            var removeFilter = function (filterKey) {
                return function () {
                    delete gScrapperParams[filterKey];
                    scheduler.stop();
                    var finalQuery = queryGen.getQuery(gScrapperParams, gIsMinute);
                    launchLoad(finalQuery);
                };
            };

            startLoading(true);
        },
        function (err) {
            console.log(err);
            alert(JSON.parse(err.responseText).ErrorMessage);
        });


}).call(this, artoo.$);
