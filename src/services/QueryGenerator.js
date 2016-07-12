var QueryGenerator = function (baseQuery, customQueryParams) {
    var baseQueryHour = "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}&period={R:{D:0}}";
    var baseQueryMinute = "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={mn}&period={R:{MN:{start:-60,end:-1}}}";
    var queryParams = {
        "level2": "space={l2s:{s:#site#,l2:#level2#}}",
        "site": "space={s:#site#}",
        "page": "filter={d_page:{$eq:'#page#'}}"
    };
    
    if(customQueryParams){
        for(var paramName in customQueryParams){
            if(customQueryParams.hasOwnProperty(paramName)){
                queryParams[paramName] = customQueryParams[paramName];
            }
        }
    }

    var getQuery = function (params) {
        var query = baseQuery;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] && queryParams[key]) {
                    if (typeof params[key] === "object") {
                        var objParam = params[key];
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
                        query += "&" + queryParams[key].replace("#" + key + "#", params[key]);
                    }
                }
            }
        }
        return query;
    };

    return {
        "getQuery": getQuery
    };
};
