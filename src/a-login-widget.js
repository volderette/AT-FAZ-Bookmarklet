var atLogin = (function () {

    var ui, $;
    var localstorage_key = "ati_bmk_authentication";

    var initialize = function (artooUi, jQ, authentication, callback, callbackError) {

        ui = artooUi;

        ui.$().append(artoo.templates["login.tpl"]);

        var user = JSON.parse(localStorage.getItem(localstorage_key));
        if (user !== null) {
            callback(user.token);
        }

        ui.$("#btn-close").bind("click", function () {
            ui.kill();
        });

        ui.$("#btnLogin").click(function () {

            showMessage("");

            var email = ui.$("#email").val();
            var pwd = ui.$("#password").val();
            var keepConnected = ui.$("#chkKeepConnected").prop("checked");

            getToken(authentication, email, pwd, function (token) {

                if (keepConnected) {
                    var user = {"email": email, "token": token};
                    localStorage.setItem(localstorage_key, JSON.stringify(user));
                }
                callback(token);

            }, function (err) {
                callbackError(err);
            });
        });


    };

    var setRelative = function (ui) {
        var topOffset = 10;
        var top = (Tools.getDocumentHeight()-topOffset) * -1;
        ui.$("#widget-container-login").css("position","relative");
        ui.$("#widget-container-login").css("top",top +"px");
    };

    var setDraggable = function (ui) {
        try {
            ui.$("#widget-container-login").draggable({
                handle: ui.$("#login-logo")
            });
        }catch(ex){
            console.log("Draggable disabled");
            console.log(ex);
        }
    };

    var getToken = function (authentication, email, pwd, callback, callbackError) {
        authentication.getToken(email, pwd, function (res) {
                callback(res);
            }, function (err) {
                callbackError(err);
            }
        );
    };

    var showMessage = function (message) {
        ui.$("#loginMessage").text(message);
    };

    var hide = function () {
        ui.$(".widget-login").remove();
    };

    return {
        "initialize": initialize,
        "hide": hide,
        "showMessage": showMessage
    }
})();
