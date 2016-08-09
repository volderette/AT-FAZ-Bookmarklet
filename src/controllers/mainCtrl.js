var mainCtrl = (function () {
    var ui, $, onCloseCallbacks = [];

    var items = [];

    var initialize = function (artooUi, jQ, authentication, token) {
        ui = artooUi;
        $ = jQ;

        items.push(
            {
                container: ui.$("#placeHolder1"),
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_site,m_visits}&sort={-m_visits}&evo={H}",
                drawer: new LineDrawer($)
            },
            {
                container: ui.$("#placeHolder2"),
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_source,m_visits}&sort={-m_visits}&max-results=10",
                drawer: new PieDrawer($, {type: "doughnut", title: "Referrers"})
            },
            {
                container: ui.$("#placeHolder3"),
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($, {title : "Today:"})
            },
            {
                container: ui.$("#placeHolder4"),
                baseQuery: "//apirest.atinternet-solutions.com/data/v2/json/getData?&columns={m_page_loads,m_visits}&sort={-m_visits}",
                drawer: new SummaryDrawer($, {title : "From the begining:"})
            }
        );

        ui.$("#btn-close").bind("click", function () {
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
            ui.kill();
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

        items.forEach(function (item) {
            item.onClose = onClose;
            item.token = token;
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
