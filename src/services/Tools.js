var Tools = (function () {

    var getDocumentHeight = function () {
        return Math.max(
            document.documentElement.clientHeight,
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );
    };

    return {
        "getDocumentHeight": getDocumentHeight
    }
})();

var Colors = (function() {

    var counter = 0;

    var colors = [
        "rgb(105, 163, 216)",
        "rgb(156, 126, 190)",
        "rgb(255, 198, 24)",
        "rgb(91, 179, 203)",
        "rgb(127, 181, 90)",
        "rgb(42, 110, 145)",
        "rgb(197, 74, 61)",
        "rgb(248, 120, 24)",
        "rgb(108, 86, 133)",
        "rgb(93, 130, 69)"];

    function getNextBGColor() {
        counter += 1;
        return colors[counter % 10]
    }

    function getBGColor(i) {
        return colors[i % 10]
    }

    return {
        "getNextBGColor": getNextBGColor,
        "getBGColor": getBGColor
    };
})();
