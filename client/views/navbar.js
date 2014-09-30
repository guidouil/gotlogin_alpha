Template.navbar.helpers({
  activeIfTemplateIs: function (template) {
    var currentRoute = Router.current();
    return currentRoute &&
      template === currentRoute.lookupTemplate() ? 'active' : '';
  },
  isLogedIn: function() {
    if (Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }
});
Template.navbar.events({
  'click .navbar-btn': function (evt, tmpl) {
    if ($("#navbarCollapse").hasClass('in')) {
      $(".navbar-toggle").click();
    };
  }
});