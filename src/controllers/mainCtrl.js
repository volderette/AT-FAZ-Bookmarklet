var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [];

    var items = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        items.push(
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}",
                drawer: new LineDrawer($,ui.$("#placeHolder1")),
                evolution: true
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Quellen"}, ui.$("#placeHolder2"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($, {title : "Heute:"}, ui.$("#placeHolder3")),
                onlyRealTime: true
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($, {title : "Ab Publishing-Datum:"}, ui.$("#placeHolder4")),
                onlyRealTime: false
            }
        );

        ui.$("#btn-close").bind("click", function () {
            try {
                onCloseCallbacks.forEach(function (callback) {
                    callback();
                });
                ui.kill();
            }
            catch (ex){};
        });

        ui.$("#btn-disconnect").bind("click", function () {
            authentication.disconnectUser();
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
        });

        ui.$("#btn-hide,#minimized-logo").bind("click", function () {
            ui.$("#widget-container").toggleClass("minimized");
        });

        if (!authentication.isConnectionKept()) {
            ui.$("#btn-disconnect").hide();
        }

        var scrapper = new TagScrapper();
        var scrapperParams = scrapper.getParamsFromTag();

        var fazScrapper = new FazScrapper();
        var customQueryValues = fazScrapper.getCustomQueryValues();
        var fazScrappedValues = fazScrapper.getScrappedValues();

        items.forEach(function (item) {
            item.onClose = onClose;
            item.token = token;
            item.scrapperParams = Tools.clone(scrapperParams);
            item.fazScrappedValues = Tools.clone(fazScrappedValues);
            item.customQueryValues = Tools.clone(customQueryValues);
            new PlaceHolderCtrl(item);
        })
    };

    var onClose = function (callback) {
        onCloseCallbacks.push(callback);
    };

    return {
        "initialize": initialize,
        "onClose": onClose
    };
})();
