var atWidget = (function () {
    var ui, $, onCloseCallback, onChangePeriodCallback;
    var initialize = function (artooUi, jQ) {
        ui = artooUi;
        $ = jQ;
        ui.$("#btn-close").bind("click", function () {
            onCloseCallback && onCloseCallback();
            ui.kill();
        });
        ui.$("#btn-hide,#minimized-logo").bind("click", function () {
            ui.$("#widget-container").toggleClass("minimized");
        });
        ui.$("#btn-switch-period").bind("click", function () {
            var btnJq = $(this);
            btnJq.toggleClass("toggle-switched-right");
            var isHour = btnJq.hasClass("toggle-switched-right");
            ui.$("#graph-title").text(isHour ? "Today" : "Last hour");
            btnJq.attr({title : isHour ? "Last hour" : "Today"});
            onChangePeriodCallback && onChangePeriodCallback(isHour);
        });
        setDraggable();
    };

    var onClose = function (callback) {
        onCloseCallback = callback;
    };

    var onChangePeriod = function (callback) {
        onChangePeriodCallback = callback;
    };

    var setDraggable = function () {
        ui.$("#widget-container").draggable({
            handle: ui.$("#maximized-nav,#minimized-logo")
        });
    };


    return {
        "initialize": initialize,
        "onClose": onClose,
        "onChangePeriod": onChangePeriod
    };
})();
