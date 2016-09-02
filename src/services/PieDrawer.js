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

        //for testing only
        //data1=JSON.parse('{"DataFeed":[{"Columns":[{"Name":"d_source","Label":"Sources","Category":"Dimension","Type":"String","CustomerType":"String"},{"Name":"m_visits","Label":"Visits","Category":"Metric","Type":"Integer","CustomerType":"Integer","Summable":true,"Pie":true}],"Rows":[{"d_source":"Direct traffic","m_visits":7262},{"d_source":"Search engines","m_visits":1043},{"d_source":"Referrer sites","m_visits":79},{"d_source":"Email marketing","m_visits":66},{"d_source":"Social","m_visits":31}]}]}');
        //data2=JSON.parse('{"DataFeed":[{"Columns":[{"Name":"d_source","Label":"Sources","Category":"Dimension","Type":"String","CustomerType":"String"},{"Name":"m_visits","Label":"Visits","Category":"Metric","Type":"Integer","CustomerType":"Integer","Summable":true,"Pie":true}],"Rows":[{"d_source":"Direct traffic","m_visits":7262},{"d_source":"Search engines","m_visits":1043},{"d_source":"Referrer sites","m_visits":79},{"d_source":"Email marketing","m_visits":66},{"d_source":"Social","m_visits":31},{"d_source":"bibi","m_visits":1500}]}]}');
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

        var i, j;

        //sum the same dimension value
        for (i = 0; i < rows1.length; i++) {
            for (j = 0; j < rows2.length; j++) {
                if(rows2[j][dimensionName]===rows1[i][dimensionName]) {
                    rows1[i][metricName]=rows2[j][metricName]+rows1[i][metricName];
                    break;
                }
            }
        }

        //add rows2 values that aren't in rows1
        var find = false;
        for (i = 0; i < rows2.length; i++) {
            find = false;
            for (j = 0; j < rows1.length; j++) {
                if(rows2[i][dimensionName]===rows1[j][dimensionName]) {
                    find=true;
                    break;
                }
            }
            if(!find) {
                rows1.push(rows2[i]);
            }
        }

        //keep only the top 10
        //first, we need to sort
        rows1.sort(function(a,b) {return (a[metricName] > b[metricName]) ? 1 : ((b[metricName] > a[metricName]) ? -1 : 0);} );

        rows1=rows1.slice(0,9);

        draw(data1, container);
    };

    var draw = function (data) {

        graphContainer.empty();

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
        //graphContainer.hide();
        loadingElement.show();
    };

    var hideWait = function() {
        loadingElement.hide();
        //graphContainer.show();
    };

    var clear = function () {
        //graphContainer.empty();
        //renderedCanvas && renderedCanvas.destroy();
    };

    return {
        "draw": draw,
        "clear": clear,
        "showWait": showWait,
        "hideWait":hideWait,
        "mergeAndDraw":mergeAndDraw
    };
};
