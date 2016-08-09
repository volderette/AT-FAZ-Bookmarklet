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

        container.append(artoo.templates["src\templates\summary.tpl"]);

        var translatedData = translateData(data);
        var summary = container.find(".summary-container");

        var title = $("<span class='summary-title'>" + options.title + "</span>");
        summary.append(title);
        container.append(summary);

        for (var i = 0; i < translatedData.labels.length; i++) {
            summary.append("<div class='summary-element'>" +
                "<span class='summary-label'>" + idTolabel(translatedData.labels[i]) + ": </span>" +
                "<span class='summary-label'>" + translatedData.datas[i] + "</span>" +
                "</div>");
        }


    };

    var idTolabel = function (id) {
        var labels = {"m_page_loads": "Page loads", "m_visits": "Visits"};
        return labels[id];
    };

    var clear = function () {

    };

    return {
        "draw": draw,
        "clear": clear
    };
};

