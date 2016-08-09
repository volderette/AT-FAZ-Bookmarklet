var PlaceHolderCtrl = function(options) {

    var fazScrapper = new FazScrapper();
    var queryGen = new QueryGenerator(options.baseQuery, fazScrapper.getCustomQueryValues());
    var apiCaller = new ApiCaller($);
    var scrapperParams = options.scrapper.getParamsFromTag();
    var loadingElement = options.container.find(".loader");
    var drawer = options.drawer;
    var historicalPeriod = false;

    var startLoading = function() {

        var fazScrappedValues = fazScrapper.getScrappedValues();
        if(!historicalPeriod){
            //Get today by default if no period given
            delete fazScrappedValues.period;
        }
        var finalQuery = queryGen.getQuery(scrapperParams, fazScrappedValues);

        if (drawer) {
            drawer.clear();
        }
        launchLoad(finalQuery);
    };

    var launchLoad = function(query) {
        loadingElement.show();
        apiCaller.call(query, {"Authorization": "Token " + options.token}, function(res) {

            drawer.draw(res, options.container);

            loadingElement.hide();

        }, function(err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
            loadingElement.hide();
        });
    };

    startLoading();
};
