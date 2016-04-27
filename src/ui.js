;(function ($, undefined) {

    // Code goes here...
    var ui = new artoo.ui({
        stylesheets: ['login.css', 'bookmark.css', 'materialize.css']
        //stylesheets: ['bookmark.css']
    });

    ui.$().append(artoo.templates['login.tpl']);
    atLogin.initialize(ui, $);


    // ui.$().append(artoo.templates['bookmark.tpl']);
    // atWidget.initialize(ui, $);
    //
    // var scrapper = new TagScrapper();
    // var queryGen = new QueryGenerator();
    // var finalQuery = queryGen.getQuery(scrapper.getParams());
    //
    // var scheduler = new Scheduler();
    // var apiCaller = new ApiCaller($);
    // var drawer = new ChartDrawer($, ui.$("#graph-container"));
    //
    // scheduler.start(function () {
    //     apiCaller.call(finalQuery, {"Authorization": "Token ZEtteHhPeW1TQWNTQU5aWnRxRi9jWEFuZ1MweGVmYWxqZHN3dU5wTVhXU2cvNjJyNjFwcElBQi8vWHBUY1VwVQ=="}, function (res) {
    //         drawer.draw(res);
    //         scheduler.restart();
    //     },function(err) {
    //         scheduler.stop();
    //         console.log(err);
    //     });
    // }, 5000);


}).call(this, artoo.$);
