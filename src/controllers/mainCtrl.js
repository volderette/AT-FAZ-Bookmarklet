var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [];

    var items = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        items.push(
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}&period={R:{D:0}}",
                drawer: new LineDrawer($,ui.$("#placeHolder1"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&period={R:{D:0}}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Referrers"}, ui.$("#placeHolder2"))
            },
            {
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}&period={R:{D:0}}",
                drawer: new SummaryDrawer($, {title : "Today:"}, ui.$("#placeHolder3"))
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

        items.forEach(function (item) {
            item.onClose = onClose;
            item.token = token;
            item.scrapperParams = Tools.clone(scrapperParams);
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
