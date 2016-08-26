var QueryGenerator = function (baseQuery, customQueryParams) {

    var queryParams = {
        "level2": "space={l2s:{s:#site#,l2:#level2#}}",
        "site": "space={s:#site#}",
        "page": "filter={d_page:{$eq:'#page#'}}",
        "period": "period=#period#"
    };

    var getQuery = function (scrappedParams) {
        var finalScrappedParams = {};
        merge(finalScrappedParams, scrappedParams);
        var query = baseQuery;
        for (var key in finalScrappedParams) {
            if (finalScrappedParams.hasOwnProperty(key)) {
                if (finalScrappedParams[key] && queryParams[key]) {
                    if (typeof finalScrappedParams[key] === "object") {
                        var objParam = finalScrappedParams[key];
                        var finalParam = queryParams[key];
                        finalParam = finalParam.replace("#" + key + "#",JSON.stringify(objParam));
                        finalParam = finalParam.replace(/"/g,""); //g# doesnt need "
                        // for (var objKey in objParam) {
                        //     if (objParam.hasOwnProperty(objKey)) {
                        //         finalParam = finalParam.replace("#" + objKey + "#", objParam[objKey]);
                        //     }
                        // }
                        if (finalParam) {
                            query += "&" + finalParam;
                        }
                    } else {
                        query += "&" + queryParams[key].replace("#" + key + "#", finalScrappedParams[key]);
                    }
                }
            }
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
