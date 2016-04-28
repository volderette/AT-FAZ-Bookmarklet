var atLogin = (function () {
    var ui, $;

    var initialize = function (artooUi, jQ, authentication) {
        ui = artooUi;
        $ = jQ;

        ui.$().append(artoo.templates['login.tpl']);

        ui.$("#btnLogin").click(function () {
            var email = ui.$("#email").val();
            var pwd = ui.$("#password").val();
            getToken(authentication, email, pwd);
        });
    };


    var getToken = function (authentication, email, pwd) {
        authentication.getToken(email, pwd, function (res) {
                console.log("getToken:"+res);
            }, function (err) {
            console.log(err);
            }
        );
    };


    var waitForLogin = function (callbackOK, callbackError) {

    };

    var hide = function () {
        ui.$(".widget-login").remove();
    };

    var setDraggable = function () {
        //$(ui.$()[0]).draggable({
        /*helper: getDragHelper,
         handle: _divCalqueEditionJq || _mainDiv,
         scroll: true,
         scrollSpeed: _data.GridWidth * 2,
         grid: [_data.GridWidth, _data.GridHeight],
         revert: false,
         start: onDragStart,
         stop: onDragStop*/
        //});
    };


    return {
        "initialize": initialize,
        "waitForLogin": waitForLogin,
        "hide": hide
    }
})();
