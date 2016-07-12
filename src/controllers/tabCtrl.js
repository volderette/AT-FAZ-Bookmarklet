var TabCtrl = function(options) {
    options.container.append(artoo.templates["src\templates\tab.tpl"]);

    var queryGen = new QueryGenerator(options.baseQuery);
    var apiCaller = new ApiCaller($);
    var siteInfos = new SiteInfos(apiCaller, {"Authorization": "Token " + options.token});
    var drawer, gIsMinute;
    var scrapperParams = options.scrapper.getParamsFromTag();
    var loadingElement = options.container.find(".loader");

    var startLoading = function() {
        //gIsMinute = isMinute;
        //createChips(scrapperParams);
        var finalQuery = queryGen.getQuery(scrapperParams);
        var graphContainer = options.container.find(".graph-container");

        if (drawer) {
            drawer.clear();
        }
        drawer = new ChartDrawer($, graphContainer);
        launchLoad(finalQuery);
    };

    var launchLoad = function(query) {
        loadingElement.show();
        apiCaller.call(query, {"Authorization": "Token " + options.token}, function(res) {
            drawer.draw(res);
            loadingElement.hide();
        }, function(err) {
            console.log(err);
            loadingElement.hide();
        });
    };

    var createChips = function(scrapperParams) {
        mainCtrl.clearChips();
        var site = scrapperParams.site || scrapperParams.level2.site;
        var level2 = scrapperParams.level2 ? scrapperParams.level2.level2 : null;
        siteInfos.getSiteInfos(site, level2, function(res) {
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

    var removeFilter = function(filterKey) {
        return function() {
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
};
