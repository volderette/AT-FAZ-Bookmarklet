;(function($, undefined) {

  // Code goes here...
  var ui = new artoo.ui({
    stylesheets: ['bookmark.css']
  });

  ui.$().append(artoo.templates['bookmark.tpl']);

  ui.$(".hello").click(function() {
    alert( "Handler for .click() called." );
  });

  var view = new View();
  view.render();

}).call(this, artoo.$);
