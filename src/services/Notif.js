var Notif = (function () {

    var init = true;

    var initIfNeeded = function () {
        if (init) {
            jQuery(".notifyjs-corner").css("z-index", "2000000");
            init = false;
        }
    };

    var info = function (msg) {

        jQuery.notify(msg, "info");
        initIfNeeded();

    };

    var success = function (msg) {

        jQuery.notify(msg, "success");
        initIfNeeded();

    };

    var warning = function (msg) {

        jQuery.notify(msg, "warning");
        initIfNeeded();


    };

    var error = function (msg) {

        jQuery.notify(msg, "error");
        initIfNeeded();

    };

    return {
        "info": info,
        "success": success,
        "warning": warning,
        "error": error
    }

})();
