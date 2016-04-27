;(function ($, undefined) {

    var externalStyles = ['https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.1.3/material.min.css'];
    var externalSscripts = ['https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.1.3/material.min.js'];

    // Code goes here...
    var ui = new artoo.ui({
        stylesheets: ['bookmark.css', 'materialize.css']
        //stylesheets: ['bookmark.css']
    });

    ui.$().append(artoo.templates['bookmark.tpl']);

    atWidget.initialize(ui, $);

}).call(this, artoo.$);
