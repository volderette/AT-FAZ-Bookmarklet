var ApiCaller = function ($) {

    var jQ = $;

    var call = function (url, headers, callback, callbackError) {
        jQ.ajax(
            {
                type: 'GET',
                url: url,
                dataType: 'json',
                headers: headers,
                success: function (data) {
                    callback && callback(data);
                },
                error: function (err) {
                    callbackError && callbackError(err);
                }
            });

     };

    var callSequential = function (url1, url2, headers, callback, callbackError) {
        call(url1, headers, function (data1) {
            call(url2, headers, function (data2) {
                callback && callback(data1, data2);
            }, function (err) {
                callbackError && callbackError(err);
            })
        }, function (err) {
            callbackError && callbackError(err);
        })
    };

    return {
        "call": call,
        "callSequential": callSequential
    }
};