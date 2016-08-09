var PieDrawer = function ($, options) {

    var renderedCanvas = null;
    var type = options && options.type || "pie"; //or doughnut
    var title = options && options.title || "";

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

        container.append(artoo.templates["src\templates\chart.tpl"]);

        var graphContainer = container.find(".graph-container");

        var translatedData = translateData(data);
        renderedCanvas = new Chart(graphContainer, {
            type: type,
            data: {
                labels: translatedData.labels,
                datasets: [{
                    data: translatedData.datas,
                    backgroundColor: translatedData.backgroundColors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        boxWidth:20,
                        fontSize:9,
                        padding:5
                    }
                },
                title: {
                    display: title !="",
                    text: title
                }
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
