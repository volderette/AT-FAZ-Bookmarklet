var PieDrawer = function ($) {

    var renderedCanvas = null;

    var translateData = function (api_data) {

        var labels = [], datas = [], backgroundColors=[];
        var baseData = api_data.DataFeed[0];

        for (var i = 0; i < baseData.Rows.length; i++) {
            var row = baseData.Rows[i];
            labels.push(row[Object.keys(row)[0]]);
            datas.push(row[Object.keys(row)[1]]);
            backgroundColors.push(getRandomColor())
        }

        return {
            "labels": labels,
            "datas": datas,
            "backgroundColors" : backgroundColors
        };
    };

    var getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    var draw = function (data, container) {

        var translatedData = translateData(data);

        renderedCanvas = new Chart(container, {
            type: 'doughnut',
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
