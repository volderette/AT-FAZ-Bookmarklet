var SummaryDrawer = function ($, options) {

    var translateData = function (api_data) {

        var labels = [], datas = [];
        var baseData = api_data.DataFeed[0];

        for (var i = 0; i < baseData.Rows.length; i++) {
            var row = baseData.Rows[i];
            var keys = Object.keys(row);
            for (var j = 0; j < keys.length; j++) {
                labels.push(keys[j]);
                datas.push(row[Object.keys(row)[j]]);
            }
        }

        return {
            "labels": labels,
            "datas": datas
        };
    };

    var draw = function (data, container) {
        var translatedData = translateData(data);
        for (var i = 0; i < translatedData.labels.length; i++) {
            container.append("<div class='summary-element'>" +
                "<span class='labelDimension'>"+ translatedData.labels[i] + ": </span>" +
                "<span class='labelMetric'>" + translatedData.datas[i]+"</span>" +
                "</div>");
        }

    };

    var clear = function () {

    };

    return {
        "draw": draw,
        "clear": clear
    };
};

