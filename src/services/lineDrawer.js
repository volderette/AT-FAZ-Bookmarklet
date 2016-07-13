var LineDrawer = function ($) {

    var renderedCanvas = null;
    Chart.defaults.global.defaultColor = "rgb(84, 131, 174)";
    Chart.defaults.global.elements.line.borderColor = "rgb(84, 131, 174)";
    var getDataFromKey = function (data, key) {
        var datas = [];
        for (var i = 0; i < data.Rows.length; i++) {
            var row = data.Rows[i];
            datas.push(row[key]);
        }
        return datas;
    };

    var getZeroAtFirst = function (value) {
        if(value < 10){
            return "0" + value.toString();
        }
        return value;
    };
    var formatDate = function (dateArray) {
        var formattedDates = [];
        dateArray.forEach(function (strDate) {
            var d = new Date(strDate);
            var formatedDate;
            formatedDate = getZeroAtFirst(d.getUTCHours()) + ":" + getZeroAtFirst(d.getUTCMinutes());
            formattedDates.push(formatedDate);
        });
        return formattedDates;
    };

    var translateData = function (api_data) {
        var labels = [], datas = [];
        var baseData = api_data.DataFeed[0];
        if(!baseData.Rows[0]){
            return {
                "labels": [],
                "datas": []
            };
        }
        var mainRow = baseData.Rows[0].Rows;
        var labelCol = "evo_hour_visit";
        for (var i = 0; i < baseData.Columns.length; i++) {
            var col = baseData.Columns[i];
            if (col.Category === "Metric") {
                datas = datas.concat(getDataFromKey(mainRow, col.Name));
            } else if (col.Name.indexOf("evo_") === 0) {
                labelCol = col.Name;
            }
        }
        labels = formatDate(getDataFromKey(mainRow, labelCol));

        return {
            "labels": labels,
            "datas": datas
        };
    };


    var draw = function (data, container) {
        var translatedData = translateData(data);

        if (renderedCanvas) {
            renderedCanvas.data.labels = [];
            renderedCanvas.data.datasets[0].data = [];
            translatedData.labels.forEach(function (el, index) {
                renderedCanvas.data.labels[index] = el;
            });
            translatedData.datas.forEach(function (el, index) {
                renderedCanvas.data.datasets[0].data[index] = el;
            });
            renderedCanvas.update(2000);
        } else {
            renderedCanvas = new Chart(container, {
                type: 'line',
                data: {
                    labels: translatedData.labels,
                    datasets: [{
                        label: '# of visits',
                        data: translatedData.datas
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    fill: false
                }
            });
        }
    };

    var clear = function () {
        renderedCanvas && renderedCanvas.destroy();
    };

    return {
        "draw": draw,
        "clear": clear
    };
};
