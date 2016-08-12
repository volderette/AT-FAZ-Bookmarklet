var PlaceHolderCtrl = function (options) {

    var drawer = options.drawer;
    var scrapperParams=options.scrapperParams;
    var fazScrappedValues=options.fazScrappedValues;
    var customQueryValues=options.customQueryValues;
    var queryGen = new QueryGenerator(options.baseQuery, customQueryValues);
    var apiCaller = new ApiCaller($);

    var startLoading = function () {

        var finalQuery = queryGen.getQuery(scrapperParams, fazScrappedValues);
        var finalQueryForceRT = "";

        if(options.onlyRealTime && !fazScrappedValues.period.R) {
            //only RT and not already a RT request
            delete fazScrappedValues.period;
            fazScrappedValues.period = "{R:{D:0}}";
            finalQuery = queryGen.getQuery(scrapperParams, fazScrappedValues);
        }
        else {
            if (!fazScrappedValues.period.R) {
                //add query for real time
                delete fazScrappedValues.period;
                fazScrappedValues.period = "{R:{D:0}}";
                finalQueryForceRT = queryGen.getQuery(scrapperParams, fazScrappedValues);
                if (options.evolution) {
                    finalQueryForceRT = finalQueryForceRT + "&evo={D}";
                    finalQuery = finalQuery + "&evo={D}";
                }
            } else {
                if (options.evolution) {
                    finalQuery = finalQuery + "&evo={H}";
                }
            }
        }

        if (drawer) {
            drawer.clear();
        }

        if (finalQueryForceRT == "") {
            launchLoad(finalQuery);
        }
        else {
            launchSequential(finalQuery, finalQueryForceRT);
        }


    };

    var launchSequential = function (query1, query2) {

        drawer.showWait();

        apiCaller.callSequential(query1, query2, {"Authorization": "Token " + options.token}, function (res1, res2) {

            drawer.mergeAndDraw(res1, res2, options.container);

            drawer.hideWait();

        }, function (err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
            drawer.hideWait();
        });
    };


    var launchLoad = function (query) {

        drawer.showWait();

        apiCaller.call(query, {"Authorization": "Token " + options.token}, function (res) {

            drawer.draw(res, options.container);

            drawer.hideWait();//loadingElement.hide();

        }, function (err) {
            console.log(err);
            Notif.error(JSON.parse(err.responseText).ErrorMessage);
            drawer.hideWait();
        });
    };

    startLoading();
};
