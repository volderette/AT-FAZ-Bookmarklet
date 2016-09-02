var PlaceHolderCtrl = function (options) {

    var drawer = options.drawer;
    var scrapperParams=options.scrapperParams;

    var queryGen = new QueryGenerator(options.baseQuery);
    var apiCaller = new ApiCaller($);

    var startLoading = function (scrapperParams) {
        var finalQuery = queryGen.getQuery(scrapperParams);

        if (drawer) {
            drawer.clear();
        }

        launchLoad(finalQuery);

    };

    var launchLoad = function (query) {

        drawer.showWait();

        apiCaller.call(query, {"Authorization": "Token " + options.token}, function (res) {

            drawer.draw(res, options.container);

            drawer.hideWait();

        }, function (err) {
            console.log(err);
            drawer.hideWait();
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
        });
    };

    startLoading(scrapperParams);

    var refresh = function (filteredParams) {
        startLoading(scrapperParams);
    };

    return {
        "refresh": refresh
    };
};
