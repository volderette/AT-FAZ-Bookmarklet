var SiteInfos = function (apiCaller, headers) {

    var getSiteInfos = function (site, level2, callback) {
        var querySite = "https://apirest.atinternet-solutions.com/rest/config/v1/site/infos?keys={id:#site#}";
        var querySiteL2 = "https://apirest.atinternet-solutions.com/rest/config/v1/site/levels2?keys={siteid:#site#,id:#level2#}";

        var finalQuery = querySite;
        if (level2 !== null) {
            finalQuery = querySiteL2.replace("#level2#", level2);
        }
        finalQuery = finalQuery.replace("#site#", site);

        apiCaller.call(finalQuery, headers, function (res) {
            var data = {
                "site": "",
                "level2": ""
            };
            if (level2 !== null) {
                data.site = res.Site.Label;
                data.level2 = res.Label;
            } else {
                data.site = res.Label;
            }
            callback(data)

        }, function (err) {
            callback({});
            console.log(err);
        });
    };

    return {
        "getSiteInfos": getSiteInfos
    };
};
