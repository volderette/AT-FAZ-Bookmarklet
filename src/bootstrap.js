;(function ($, undefined) {

    //bootstrap function

    var ui = new artoo.ui({
        stylesheets: ["src\css\global.css", "src\css\login.css", "src\css\main.css"]
    });

    var apiCaller = new ApiCaller($);

    var authentication = new Authentication(apiCaller);

    loginCtrl.initialize(ui, $, authentication,
        function (token) {

            loginCtrl.hide();

            ui.$().append(artoo.templates["src\templates\main.tpl"]);

            var loader = ui.$("#loader");

            mainCtrl.initialize(ui, $, authentication, token);
            mainCtrl.onClose(function () {

            });

        },
        function (err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
        });

}).call(this, artoo.$);
