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

    return {
        "call": call
    }
};