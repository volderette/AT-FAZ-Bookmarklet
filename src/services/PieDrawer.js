var PieDrawer = function ($, options, container) {

    container.append(artoo.templates["src\templates\chart.tpl"]);
    var graphContainer = container.find(".graph-container");
    var loadingElement = container.find(".loading-container");

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

    var mergeAndDraw = function (data1, data2, container) {
        //merge rows data, columns need to be the same

        var dimensionName="", metricName="";

        var columns = data1.DataFeed[0].Columns;
        for (var k = 0; k < columns.length; k++) {
            if(columns[k].Category==="Dimension") {
                dimensionName=columns[k].Name;
            }
            else if(columns[k].Category==="Metric") {
                metricName=columns[k].Name;
            }
            if(metricName!="" && metricName!="") {
                break;
            }
        }

        var rows1 = data1.DataFeed[0].Rows;
        var rows2 = data2.DataFeed[0].Rows;

        for (var i = 0; i < rows1.length; i++) {
            for (var j = 0; j < rows2.length; j++) {
                if(rows2[j][dimensionName]===rows1[i][dimensionName]) {
                    rows1[i][metricName]=rows2[j][metricName]+rows1[i][metricName];
                    break;
                }
            }
        }
        draw(data1, container);
    };

    var draw = function (data) {

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

    var showWait = function() {
        loadingElement.show();
    };

    var hideWait = function() {
        loadingElement.hide();
    };

    var clear = function () {
        renderedCanvas && renderedCanvas.destroy();
    };

    return {
        "draw": draw,
        "clear": clear,
        "showWait": showWait,
        "hideWait":hideWait,
        "mergeAndDraw":mergeAndDraw
    };
};
