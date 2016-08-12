//Get informations from FAZ website to customize data request
var FazScrapper = function() {
    var getScrappedValues = function() {
        if (!window.co) {
            throw new Error("FAZ object 'co' not found in page");
        }
        else {

            var start = getStartPeriod();
            var end = getEndPeriod();

            if(start>end) {
                //only real time needed
                return {
                    "articleId": getArticleId(),
                    "period": {
                        R:{D:0}
                    }
                };

            }
            else {
                //need also real time data
                return {
                    "articleId": getArticleId(),
                    "period": {
                        "start": "'" + convertDateToString(start) + "'",
                        "end": "'" + convertDateToString(end) + "'"
                    }
                };
            }



        }

    };

    var getArticleId = function() {
        return window.co.articleID;
    };

    var getStartPeriod = function() {
        var _date = window.co.timestamp.substring(0, 10);
        var tabDate = _date.split("-");
        return new Date(tabDate[0], tabDate[1], tabDate[2])
    };

    var addZero = function(value) {
        if (value < 10) {
            return "0" + value.toString();
        }
        return value;
    };

    var getEndPeriod = function() {
        var end = new Date(new Date().valueOf() - 24*60*60*1000);
        //var end = new Date();
        return end;
    };

    var convertDateToString = function(_date) {
        return _date.getFullYear() + "-" + addZero(_date.getMonth() + 1) + "-" + addZero(_date.getDate());
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
