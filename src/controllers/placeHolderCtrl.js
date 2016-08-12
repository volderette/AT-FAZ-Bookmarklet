var PlaceHolderCtrl = function (options) {

    var fazScrapper = new FazScrapper();
    var queryGen = new QueryGenerator(options.baseQuery, fazScrapper.getCustomQueryValues());
    var apiCaller = new ApiCaller($);
    var scrapperParams = options.scrapper.getParamsFromTag();
    var drawer = options.drawer;
    var historicalPeriod = true;

    var startLoading = function () {

        var fazScrappedValues = fazScrapper.getScrappedValues();
        if (!historicalPeriod) {
            //Get today by default if no period given
            delete fazScrappedValues.period;
        }

        var finalQuery = queryGen.getQuery(scrapperParams, fazScrappedValues);
        var finalQueryForceRT = "";

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
