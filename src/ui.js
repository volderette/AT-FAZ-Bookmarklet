;(function ($, undefined) {

    // Code goes here...
    var ui = new artoo.ui({
        stylesheets: ['login.css', 'bookmark.css', 'materialize.css']
        //stylesheets: ['bookmark.css']
    });

    var apiCaller = new ApiCaller($)
    var authentication = new Authentication(apiCaller);
    atLogin.initialize(ui, $, authentication);

    //var apiCaller = new ApiCaller($);
    
    
    // atLogin.waitForLogin(function(res) {
    //     console.log(res);
    // },function(err) {
    //     console.log(err);
    // });

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
