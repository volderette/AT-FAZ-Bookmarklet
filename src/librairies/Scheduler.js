var Scheduler = function () {

    var timer;
    var isInProgress = false;

    var restart = function () {
        isInProgress = false;
    };

    var start = function (functionToCall, interval) {
        isInProgress=true;
        functionToCall();
        timer = setInterval(function () {
            if (!isInProgress) {
                isInProgress = true;
                functionToCall();
            }
        }, interval);
    };

    var stop = function () {
        isInProgress = false;
        clearInterval(timer);
    };

    return {
        "start": start,
        "stop": stop,
        "restart": restart
    }
};