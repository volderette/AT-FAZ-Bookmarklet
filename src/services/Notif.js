var Notif = (function () {

    var init = true;

    var initIfNeeded = function () {
        if (init) {
            $(".notifyjs-corner").css("z-index", "2000000");
            init = false;
        }
    };

    var info = function (msg) {

        $.notify(msg, "info");
        initIfNeeded();

    };

    var success = function (msg) {

        $.notify(msg, "success");
        initIfNeeded();

    };

    var warning = function (msg) {

        $.notify(msg, "warning");
        initIfNeeded();


    };

    var error = function (msg) {

        $.notify(msg, "error");
        initIfNeeded();

    };

    return {
        "info": info,
        "success": success,
        "warning": warning,
        "error": error
    }

})();
