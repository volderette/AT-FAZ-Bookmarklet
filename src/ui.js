;(function ($, undefined) {

    // Code goes here...
    var ui = new artoo.ui({
        stylesheets: ['bookmark.css', 'materialize.css']
        //stylesheets: ['bookmark.css']
    });

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
    var apiCaller = new ApiCaller($);

    var startLoading = function (isMinute) {
        var finalQuery = queryGen.getQuery(scrapper.getParams(), isMinute);
        var graphContainer = ui.$("#graph-container");
        graphContainer.empty();
        var drawer = new ChartDrawer($, graphContainer);

        scheduler.start(function () {
            apiCaller.call(finalQuery, {"Authorization": "Token ZEtteHhPeW1TQWNTQU5aWnRxRi9jWEFuZ1MweGVmYWxqZHN3dU5wTVhXU2cvNjJyNjFwcElBQi8vWHBUY1VwVQ=="}, function (res) {
                drawer.draw(res);
                scheduler.restart();
            }, function (err) {
                scheduler.stop();
                console.log(err);
            });
        }, 5000);
    };

    startLoading(true);

}).call(this, artoo.$);
