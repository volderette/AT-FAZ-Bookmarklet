var mainCtrl = (function () {
    var ui, $, onCloseCallback, onChangePeriodCallback;
    var topOffset = 10;

    var initialize = function (artooUi, jQ, authentication) {
        ui = artooUi;
        $ = jQ;

        ui.$("#btn-close").bind("click", function () {
            onCloseCallback && onCloseCallback();
            ui.kill();
        });

        ui.$("#btn-disconnect").bind("click", function () {
            authentication.disconnectUser();
            onCloseCallback && onCloseCallback();
            ui.kill();
        });

        ui.$("#btn-hide,#minimized-logo").bind("click", function () {
            ui.$("#widget-container").toggleClass("minimized");
        });

        ui.$("#btn-switch-period").bind("click", function () {
            var btnJq = $(this);
            btnJq.toggleClass("toggle-switched-right");
            var isHour = btnJq.hasClass("toggle-switched-right");
            ui.$("#graph-title").text(isHour ? "Today" : "Last hour");
            btnJq.attr({title : isHour ? "Last hour" : "Today"});
            onChangePeriodCallback && onChangePeriodCallback(isHour);
        });

        if (!authentication.isConnectionKept()) {
            ui.$("#btn-disconnect").hide();
        }

    };

    var onClose = function (callback) {
        onCloseCallback = callback;
    };

    var onChangePeriod = function (callback) {
        onChangePeriodCallback = callback;
    };

    var setDraggable = function () {
        try {
            ui.$("#widget-container").draggable({
                handle: ui.$("#maximized-nav,#minimized-logo")
            });
        }catch(ex){
            console.log("Draggable disabled");
            console.log(ex);
        }
    };

    var clearChips = function () {
        ui.$("#chip-container").empty();
    };

    var addChips = function (name, value, removable, removeCallback) {
        var chip = "<div class=\"chip\" id=\"chip-#name#\" title=\"#name#\">#name# : #value#";
        if(removable){
            chip += "<button type=\"button\" class=\"btn-header right\" title=\"Remove filter\" id=\"btn-remove-filter-#name#\">×</button>";
        }
        chip += "</div>";
        chip = chip.replace(/#name#/g, name);
        chip = chip.replace("#value#", value);
        var container = ui.$("#chip-container");
        container.append(chip);
        if(removable && removeCallback) {
            var btn = ui.$("#btn-remove-filter-" + name);
            btn.bind("click", function () {
                removeCallback();
                ui.$("#chip-" + name).remove();
            });
        }
    };

    return {
        "initialize": initialize,
        "onClose": onClose,
        "onChangePeriod": onChangePeriod,
        "clearChips": clearChips,
        "addChips": addChips
    };
})();
