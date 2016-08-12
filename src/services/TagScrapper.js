var TagScrapper = function () {
    var getParamsFromTag = function () {
        return params = {
            "site": getSite()
        };
    };

    var getSite = function () {
        if (window.xtsite) {
            return window.xtsite;
        }
        return getValueFromConfigInNewTag("site");
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
    
    var getLastIndexOfArray = function (array) {
        return array[array.length - 1];
    };
    return {
        "getParamsFromTag": getParamsFromTag
    };
};
