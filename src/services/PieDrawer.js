var PieDrawer = function ($, options) {

    var renderedCanvas = null;
    var type = options && options.type || "pie"; //or doughnut

    var translateData = function (api_data) {

        var labels = [], datas = [], backgroundColors=[];
        var baseData = api_data.DataFeed[0];

        for (var i = 0; i < baseData.Rows.length; i++) {
            var row = baseData.Rows[i];
            labels.push(row[Object.keys(row)[0]]);
            datas.push(row[Object.keys(row)[1]]);
            backgroundColors.push(Colors.getBGColor(i))
        }

        return {
            "labels": labels,
            "datas": datas,
            "backgroundColors" : backgroundColors
        };
    };

    var draw = function (data, container) {

        var translatedData = translateData(data);
        renderedCanvas = new Chart(container, {
            type: type,
            data: {
                labels: translatedData.labels,
                datasets: [{
                    data: translatedData.datas,
                    backgroundColor: translatedData.backgroundColors
                }]
            }
        });

    };

    var clear = function () {
        renderedCanvas && renderedCanvas.destroy();
    };

    return {
        "draw": draw,
        "clear": clear
    };
};
