var Scheduler = function (loadingElement) {

    var timer;
    var isInProgress = false;

    var restart = function () {
        loadingElement.hide();
        isInProgress = false;
    };

    var start = function (functionToCall, interval) {
        loadingElement.show();
        isInProgress=true;
        functionToCall();
        timer = setInterval(function () {
            if (!isInProgress) {
                loadingElement.show();
                isInProgress = true;
                functionToCall();
            }
        }, interval);
    };

    var stop = function () {
        loadingElement.hide();
        isInProgress = false;
        clearInterval(timer);
    };

    return {
        "start": start,
        "stop": stop,
        "restart": restart
    }
};