var loginCtrl = (function () {

    var ui;

    var initialize = function (artooUi, jQ, authentication, callback, callbackError) {

        ui = artooUi;

        ui.$().append(artoo.templates["src\templates\login.tpl"]);

        var userToken = authentication.getCurrentUserToken();
        if (userToken !== "") {
            callback(userToken);
        }

        ui.$("#btn-close").bind("click", function () {
            ui.kill();
        });
        
        ui.$("#btnLogin").click(function () {
                        
            var email = ui.$("#email").val();
            var pwd = ui.$("#password").val();
            var keepConnected = ui.$("#chkKeepConnected").prop("checked");
            
            getToken(authentication, email, pwd, function (token) {
            
                if (keepConnected) {
                    authentication.keepUserConnected(email, token);
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
