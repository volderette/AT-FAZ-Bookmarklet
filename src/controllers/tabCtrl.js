var TabCtrl = function(options) {
    options.container.append(artoo.templates["src\templates\tab.tpl"]);

    var fazScrapper = new FazScrapper();
    var queryGen = new QueryGenerator(options.baseQuery, fazScrapper.getCustomQueryValues());
    var apiCaller = new ApiCaller($);
    var scrapperParams = options.scrapper.getParamsFromTag();
    var loadingElement = options.container.find(".loader");
    var graphContainer, drawer = options.drawer;
    var historicalPeriod = false;

    var startLoading = function() {
        //gIsMinute = isMinute;
        //createChips(scrapperParams);
        var fazScrappedValues = fazScrapper.getScrappedValues();
        if(!historicalPeriod){
            //Get today by default if no period given
            delete fazScrappedValues.period;
        }
        var finalQuery = queryGen.getQuery(scrapperParams, fazScrappedValues);
        graphContainer = options.container.find(".graph-container");

        if (drawer) {
            drawer.clear();
        }
        launchLoad(finalQuery);
    };

    var launchLoad = function(query) {
        loadingElement.show();
        apiCaller.call(query, {"Authorization": "Token " + options.token}, function(res) {
            drawer.draw(res, graphContainer);
            loadingElement.hide();
        }, function(err) {
            console.log(err);
            loadingElement.hide();
        });
    };
    options.onChangePeriod(function (isHistorical) {
        historicalPeriod = isHistorical;
        startLoading();
    });

    startLoading(true);
};
