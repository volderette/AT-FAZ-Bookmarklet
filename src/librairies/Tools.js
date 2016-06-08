var Tools = (function () {

    var getDocumentHeight = function () {
        return Math.max(
            document.documentElement.clientHeight,
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );
    }

    return {
        "getDocumentHeight": getDocumentHeight
    }
})();