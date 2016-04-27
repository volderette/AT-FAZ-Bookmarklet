var Scheduler = function ($) {

    var timer;

    var start = function (functionToCall, interval) {
        timer = setInterval(functionToCall, interval);
    };

    var stop = function () {
        clearInterval(timer);
    };

    return {
        "start": start,
        "stop": stop
    }
};