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
            //var scheduler = new Scheduler(loader);

            mainCtrl.initialize(ui, $, authentication, token);
            mainCtrl.onClose(function () {

            });
            mainCtrl.onChangePeriod(function (isHour) {

               
            });

            
        },
        function (err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
        });

}).call(this, artoo.$);
