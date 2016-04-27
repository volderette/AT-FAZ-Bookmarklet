var mockData = {
    "DataFeed": [{
        "Columns": [{
            "Name": "d_site",
            "Label": "Sites",
            "Category": "Dimension",
            "Type": "String",
            "CustomerType": "String"
        }, {
            "Name": "m_visits",
            "Label": "Visites",
            "Category": "Metric",
            "Type": "Integer",
            "CustomerType": "Integer",
            "Summable": true,
            "Pie": true
        }, {
            "Name": "d_time_hour_visit",
            "Label": "Heures (début visite)",
            "Category": "Dimension",
            "Type": "Integer",
            "CustomerType": "Hour",
            "Auto": true
        }, {
            "Name": "d_time_date",
            "Label": "Date",
            "Category": "Dimension",
            "Type": "Date",
            "CustomerType": "Date",
            "Auto": true
        }, {
            "Name": "evo_hour_visit",
            "Label": "Heure (visites)",
            "Category": "Dimension",
            "Type": "Date",
            "CustomerType": "Time",
            "Range": "Period_restricted",
            "Auto": true
        }],
        "Rows": [{
            "Rows": {
                "d_site": "AT Internet - NX",
                "m_visits": 4350,
                "Rows": [{
                    "d_time_hour_visit": 6,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T06:00:00",
                    "m_visits": 58
                }, {
                    "d_time_hour_visit": 7,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T07:00:00",
                    "m_visits": 106
                }, {
                    "d_time_hour_visit": 8,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T08:00:00",
                    "m_visits": 243
                }, {
                    "d_time_hour_visit": 9,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T09:00:00",
                    "m_visits": 561
                }, {
                    "d_time_hour_visit": 10,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T10:00:00",
                    "m_visits": 535
                }, {
                    "d_time_hour_visit": 11,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T11:00:00",
                    "m_visits": 493
                }, {
                    "d_time_hour_visit": 12,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T12:00:00",
                    "m_visits": 350
                }, {
                    "d_time_hour_visit": 13,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T13:00:00",
                    "m_visits": 317
                }, {
                    "d_time_hour_visit": 14,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T14:00:00",
                    "m_visits": 449
                }, {
                    "d_time_hour_visit": 15,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T15:00:00",
                    "m_visits": 423
                }, {
                    "d_time_hour_visit": 16,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T16:00:00",
                    "m_visits": 418
                }, {
                    "d_time_hour_visit": 17,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T17:00:00",
                    "m_visits": 397
                }]
            }
        }]
    }]
}
var mockData2 = {
    "DataFeed": [{
        "Columns": [{
            "Name": "d_site",
            "Label": "Sites",
            "Category": "Dimension",
            "Type": "String",
            "CustomerType": "String"
        }, {
            "Name": "m_visits",
            "Label": "Visites",
            "Category": "Metric",
            "Type": "Integer",
            "CustomerType": "Integer",
            "Summable": true,
            "Pie": true
        }, {
            "Name": "d_time_hour_visit",
            "Label": "Heures (début visite)",
            "Category": "Dimension",
            "Type": "Integer",
            "CustomerType": "Hour",
            "Auto": true
        }, {
            "Name": "d_time_date",
            "Label": "Date",
            "Category": "Dimension",
            "Type": "Date",
            "CustomerType": "Date",
            "Auto": true
        }, {
            "Name": "evo_hour_visit",
            "Label": "Heure (visites)",
            "Category": "Dimension",
            "Type": "Date",
            "CustomerType": "Time",
            "Range": "Period_restricted",
            "Auto": true
        }],
        "Rows": [{
            "Rows": {
                "d_site": "AT Internet - NX",
                "m_visits": 4418,
                "Rows": [{
                    "d_time_hour_visit": 7,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T07:00:00",
                    "m_visits": 106
                }, {
                    "d_time_hour_visit": 8,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T08:00:00",
                    "m_visits": 243
                }, {
                    "d_time_hour_visit": 9,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T09:00:00",
                    "m_visits": 561
                }, {
                    "d_time_hour_visit": 10,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T10:00:00",
                    "m_visits": 535
                }, {
                    "d_time_hour_visit": 11,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T11:00:00",
                    "m_visits": 493
                }, {
                    "d_time_hour_visit": 12,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T12:00:00",
                    "m_visits": 350
                }, {
                    "d_time_hour_visit": 13,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T13:00:00",
                    "m_visits": 317
                }, {
                    "d_time_hour_visit": 14,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T14:00:00",
                    "m_visits": 449
                }, {
                    "d_time_hour_visit": 15,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T15:00:00",
                    "m_visits": 423
                }, {
                    "d_time_hour_visit": 16,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T16:00:00",
                    "m_visits": 418
                }, {
                    "d_time_hour_visit": 17,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T17:00:00",
                    "m_visits": 397
                }, {
                    "d_time_hour_visit": 18,
                    "d_time_date": "2016-04-27",
                    "evo_hour_visit": "2016-04-27T18:00:00",
                    "m_visits": 126
                }]
            }
        }]
    }]
};

;(function ($, undefined) {

    // Code goes here...
    var ui = new artoo.ui({
        stylesheets: ['bookmark.css', 'materialize.css']
        //stylesheets: ['bookmark.css']
    });

    ui.$().append(artoo.templates['bookmark.tpl']);
    atWidget.initialize(ui, $);

    var scrapper = new TagScrapper();
    var queryGen = new QueryGenerator();
    var finalQuery = queryGen.getQuery(scrapper.getParams());
    var scheduler = new Scheduler();
    var apiCaller = new ApiCaller($);
    var drawer = new ChartDrawer($, ui.$("#graph-container"));

    scheduler.start(function () {
        apiCaller.call(finalQuery, {"Authorization": "Token ZEtteHhPeW1TQWNTQU5aWnRxRi9jWEFuZ1MweGVmYWxqZHN3dU5wTVhXU2cvNjJyNjFwcElBQi8vWHBUY1VwVQ=="}, function (res) {
            drawer.draw(res);
            scheduler.restart();
        },function(err) {
            scheduler.stop();
            console.log(err);
        });
    }, 5000);


}).call(this, artoo.$);
