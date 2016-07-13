//Get informations from FAZ website to customize data request
var FazScrapper = function() {
    var getScrappedValues = function() {
        if (!window.co) {
            throw new Error("FAZ object 'co' not found in page");
        }
        return {
            "articleId": getArticleId(),
            "period": {
                "start": "'" + getStartPeriod() + "'",
                "end": "'" + getEndPeriod() + "'"
            }
        };
    };

    var getArticleId = function() {
        return window.co.articleID;
    };

    var getStartPeriod = function() {
        return window.co.timestamp.substring(0, 10);
    };

    var addZero = function(value) {
        if (value < 10) {
            return "0" + value.toString();
        }
        return value;
    };

    var getEndPeriod = function() {
        var yesterday = new Date(new Date().valueOf() - 24*60*60*1000);
        return yesterday.getFullYear() + "-" + addZero(yesterday.getMonth() + 1) + "-" + addZero(yesterday.getDate());
    };

    var getCustomQueryValues = function() {
        return {
            "articleId": "filter={cd_artikidv2:{$eq:'#articleId#'}}"
        };
    };

    return {
        "getScrappedValues": getScrappedValues,
        "getCustomQueryValues": getCustomQueryValues
    };
};
