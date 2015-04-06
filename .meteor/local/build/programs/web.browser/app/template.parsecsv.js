(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>View Networks</h1>\n  "), Spacebars.include(view.lookupTemplate("networks")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("networks");
Template["networks"] = new Template("Template.networks", (function() {
  var view = this;
  return HTML.UL("\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("headers"));
  }, function() {
    return [ "\n		", HTML.P(Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n    " ];
  }), "\n  ");
}));

})();
