var QueryGenerator = function (baseQuery, customQueryParams) {

    var queryParams = {
        "level2": "space={l2s:{s:#site#,l2:#level2#}}",
        "site": "space={s:#site#}",
        "page": "filter={d_page:{$eq:'#page#'}}",
        "period": "period=#period#",
        "evo": "evo=#evo#"
    };

    var getQuery = function (scrappedParams) {
        var params = {};
        merge(params, scrappedParams);
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
                        if(key==="evo") {
                            if (query.indexOf("#evo#")>0) {
                                query = query.replace("#evo#", "");
                                query += "&" + queryParams[key].replace("#" + key + "#", params[key]);
                            }
                        }
                        else {
                            query += "&" + queryParams[key].replace("#" + key + "#", params[key]);
                        }
                    }
                }
            }
        }

        /*default value if non existent*/
        if(query.indexOf("period")<0) {
            query += "&period={R:{D:0}}";
        }
        if(query.indexOf("#evo#")>0) {
            query = query.replace("#evo#", "&evo={H}");
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
