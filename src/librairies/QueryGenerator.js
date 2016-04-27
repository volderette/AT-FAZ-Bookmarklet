var QueryGenerator = function () {
    var baseQuery = "https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&space={s:#site#}&evo={H}&period={R:{H:{start:-11,end:0}}}";
    var getQuery = function (params) {
        var query = baseQuery;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key]) {
                    query = query.replace("#" + key + "#", params[key]);
                }
            }
        }
        return query;
    };

    return {
        "getQuery": getQuery
    };
};
