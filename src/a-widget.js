var atWidget = (function () {
    var ui, $, onCloseCallback;
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
        setDraggable();
    };

    var onClose = function (callback) {
        onCloseCallback = callback;
    };

    var setDraggable = function () {
        ui.$("#widget-container").draggable({
            handle: ui.$("#maximized-nav,#minimized-logo")
        /*helper: getDragHelper,
         handle: _divCalqueEditionJq || _mainDiv,
         scroll: true,
         scrollSpeed: _data.GridWidth * 2,
         grid: [_data.GridWidth, _data.GridHeight],
         revert: false,
         start: onDragStart,
         stop: onDragStop*/
        });
    };


    return {
        "initialize": initialize,
        "onClose": onClose
    }
})();
