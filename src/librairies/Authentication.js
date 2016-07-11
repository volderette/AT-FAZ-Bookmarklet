var Authentication = function (ApiCaller) {

    var urlAuthent="https://apirest.atinternet-solutions.com/rest/config/v1/authentication/authentication/";
    var localstorage_key = "ati_bmk_authentication";

    var getToken= function(email, password, callback, callbackError) {

        var b64=btoa(email +':' +password);

        ApiCaller.call(urlAuthent, {"Authorization": "Basic " + b64}, function(res){
            callback && callback(btoa(res.ExpiringToken));
        }, function(err) {
            callbackError && callbackError(err);
        })

    };

    var keepUserConnected= function(email, token) {
        var user = {"email": email, "token": token};
        localStorage.setItem(localstorage_key, JSON.stringify(user));
    };

    var disconnectUser= function() {
        localStorage.removeItem(localstorage_key);
    };

    var getCurrentUserToken = function () {
        var user = JSON.parse(localStorage.getItem(localstorage_key));
        if (user !== null) {
            return user.token;
        }
        return "";
    };

    var keepConnection = function () {
        return getCurrentUserToken() !== "";
    };

    return {
        "getToken":getToken,
        "keepUserConnected": keepUserConnected,
        "disconnectUser": disconnectUser,
        "getCurrentUserToken": getCurrentUserToken,
        "keepConnection" : keepConnection
    }
};
