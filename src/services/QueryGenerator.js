var QueryGenerator = function (baseQuery, customQueryParams) {
    var baseQueryHour = "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}&period={R:{D:0}}";
    var baseQueryMinute = "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={mn}&period={R:{MN:{start:-60,end:-1}}}";
    var queryParams = {
        "level2": "space={l2s:{s:#site#,l2:#level2#}}",
        "site": "space={s:#site#}",
        "page": "filter={d_page:{$eq:'#page#'}}",
        "period": "period={D:{start:#start#,end:#end#}}"
    };

    var getQuery = function (scrappedParams, customScrappedParams) {
        merge(scrappedParams, customScrappedParams);
        var query = baseQuery;
        for (var key in scrappedParams) {
            if (scrappedParams.hasOwnProperty(key)) {
                if (scrappedParams[key] && queryParams[key]) {
                    if (typeof scrappedParams[key] === "object") {
                        var objParam = scrappedParams[key];
                        var finalParam = queryParams[key];
                        for (var objKey in objParam) {
                            if (objParam.hasOwnProperty(objKey)) {
                                finalParam = finalParam.replace("#" + objKey + "#", objParam[objKey]);
                            }
                        }
                        if (finalParam) {
                            query += "&" + finalParam;
                        }
                    } else {
                        query += "&" + queryParams[key].replace("#" + key + "#", scrappedParams[key]);
                    }
                }
            }
        }
        if(!scrappedParams["period"]){
            query += "&period={R:{D:0}}";
        }
        return query;
    };

    var merge = function(obj1, obj2) {
        if(obj2){
            for(var paramName in obj2){
                if(obj2.hasOwnProperty(paramName)){
                    obj1[paramName] = obj2[paramName];
                }
            }
        }
    };

    merge(queryParams, customQueryParams);

    return {
        "getQuery": getQuery
    };
};
