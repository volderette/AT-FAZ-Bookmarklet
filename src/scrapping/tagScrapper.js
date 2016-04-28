var TagScrapper = function () {
    var getParamsFromTag = function () {
        var params = {
            "site": getSite(),
            "page": getPage()
        };
        var level2 = getLevel2();
        if (level2) {
            params.level2 = {
                "site": getSite(),
                "level2": getLevel2()
            };
            delete params.site;
        }
        return params;
    };

    var getSite = function () {
        if (window.xtsite) {
            return window.xtsite;
        }
        return getValueFromConfigInNewTag("site");
    };

    var getLevel2 = function () {
        if (window.xtsite) {
            return window.xtn2;
        }
        return getValueFromConfigInNewTag("level2");
    };

    var getPage = function () {
        if (window.xtpage) {
            return window.xtpage;
        }
        var page = getValueFromContextInNewTag("page");
        if (page) {
            return page.name;
        }
        return null;
    };

    var getValueFromConfigInNewTag = function (key) {
        if (window.ATInternet && window.ATInternet.Tracker) {
            if (window.ATInternet.Tracker.instances && window.ATInternet.Tracker.instances[0]) {
                return window.ATInternet.Tracker.instances[0].getConfig(key);
            } else if (window.ATInternet.Tracker.Tag && window.ATInternet.Tracker.Tag.prototype.instances[0]) {
                return window.ATInternet.Tracker.Tag.prototype.instances[0].getConfig(key);
            }
        }
        return null;
    };

    var getValueFromContextInNewTag = function (key) {
        if (window.ATInternet && window.ATInternet.Tracker && window.ATInternet.Tracker.Tag) {
            if (window.ATInternet.Tracker.instances && window.ATInternet.Tracker.instances[0]) {
                return window.ATInternet.Tracker.instances[0].getContext(key);
            } else if (window.ATInternet.Tracker.Tag && window.ATInternet.Tracker.Tag.prototype.instances[0]) {
                return window.ATInternet.Tracker.Tag.prototype.instances[0].getContext(key);
            }
        }
        return null;
    };

    return {
        "getParamsFromTag": getParamsFromTag
    };
};
