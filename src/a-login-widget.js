var atLogin = (function () {
    var ui, $;
    var initialize = function (artooUi, jQ) {
        ui = artooUi;
        $ = jQ;
        setDraggable();

        ui.$("#btnLogin").click(function() {
            alert( "Handler for .click() called." );
        });
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
        "initialize": initialize
    }
})();
