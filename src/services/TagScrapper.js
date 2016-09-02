var TagScrapper = function () {
    var getParamsFromTag = function () {
        var params = {
            "site": getSite(),
            "page": getPage()
        };
        var level2 = getLevel2();
        if (level2) {

            var page = params.page;
            var site = params.site;

            delete params.site;
            delete params.page;

            params.level2 = {
                "site": site,
                "level2": level2
            };

            params.page = page;

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
        var page = getValueFromContextInNewTag("page");
        if (page && page.level2) {
            return page.level2;
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
                return getLastIndexOfArray(window.ATInternet.Tracker.instances).getConfig(key);
            } else if (window.ATInternet.Tracker.Tag && window.ATInternet.Tracker.Tag.prototype.instances[0]) {
                return getLastIndexOfArray(window.ATInternet.Tracker.Tag.prototype.instances).getConfig(key);
            }
        }
        return null;
    };

    var getValueFromContextInNewTag = function (key) {
        if (window.ATInternet && window.ATInternet.Tracker && window.ATInternet.Tracker.Tag) {
            if (window.ATInternet.Tracker.instances && window.ATInternet.Tracker.instances[0]) {
                return getLastIndexOfArray(window.ATInternet.Tracker.instances).getContext(key);
            } else if (window.ATInternet.Tracker.Tag && window.ATInternet.Tracker.Tag.prototype.instances[0]) {
                return getLastIndexOfArray(window.ATInternet.Tracker.Tag.prototype.instances).getContext(key);
            }
        }
        return null;
    };

    var getLastIndexOfArray = function (array) {
        return array[array.length - 1];
    };
    return {
        "getParamsFromTag": getParamsFromTag
    };
};
