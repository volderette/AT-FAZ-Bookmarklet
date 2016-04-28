var Authentication = function (ApiCaller) {

    var urlAuthent="https://apirest.atinternet-solutions.com/rest/config/v1/authentication/authentication/";

    var getToken= function(email, password, callback, callbackError) {

        var b64=btoa(email +':' +password);

        ApiCaller.call(urlAuthent, {"Authorization": "Basic " + b64}, function(res){
            callback && callback(btoa(res.ExpiringToken));
        }, function(err) {
            callbackError && callbackError(err);
        })

    };

    return {
        "getToken":getToken
    }
}
