var SummaryDrawer = function ($, options, container) {

    container.append(artoo.templates["src\templates\summary.tpl"]);
    var summary = container.find(".summary-container");
    var loadingElement = container.find(".loading-container");

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

    var mergeAndDraw = function (data1, data2, container) {
        //merge rows data, columns need to be the same
        //Array.prototype.push.apply(data1.DataFeed[0].Rows[0].Rows.Rows,data2.DataFeed[0].Rows[0].Rows.Rows);
        draw(data1, container);
    };


    var draw = function (data) {

        var translatedData = translateData(data);

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
        if(!labels[id]) {
            return id;
        }
        return labels[id];
    };

    var showWait = function() {
        //summary.hide();
        loadingElement.show();
    };

    var hideWait = function() {
        loadingElement.hide();
        //summary.show();
    };

    var clear = function () {
        summary.empty();
    };

    return {
        "draw": draw,
        "mergeAndDraw": mergeAndDraw,
        "clear": clear,
        "showWait": showWait,
        "hideWait":hideWait
    };
};

