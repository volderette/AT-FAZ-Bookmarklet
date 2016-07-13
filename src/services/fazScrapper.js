//Get informations from FAZ website to customize data request
var FazScrapper = function() {
    var getScrappedValues = function() {
        if(!window.co){
            throw new Error("FAZ object 'co' not found in page");
        }
        return {
            "articleId": getArticleId(),
            "period": {
                "start": "'" + getStartPeriod() + "'",
                "end": "'2016-07-12'"
            }
        };
    };

    var getArticleId = function() {
        return window.co.articleID;
    };

    var getStartPeriod = function() {
        return window.co.timestamp.substring(0,10);
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
