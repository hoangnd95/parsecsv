(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>View Networks</h1>\n  "), Spacebars.include(view.lookupTemplate("networks")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("networks");
Template["networks"] = new Template("Template.networks", (function() {
  var view = this;
  return HTML.TABLE("\n	", HTML.THEAD("\n		", HTML.TR("\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("headers"));
  }, function() {
    return [ "\n			", HTML.TH(Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n			" ];
  }), "\n		"), "\n	"), "\n	", HTML.TBODY("\n		", Blaze.Each(function() {
    return Spacebars.call(view.lookup("items"));
  }, function() {
    return [ "\n		", HTML.TR("\n		", HTML.TD(Blaze.View("lookup:..Path", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "Path"));
    })), "\n		"), "\n		" ];
  }), "\n	"), "\n  ");
}));

})();
