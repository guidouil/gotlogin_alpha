var navTutorialSteps = [
  {
    template: Template.tutorial_step1,
    spot: "#dashboardBtn"
  },
  {
    template: Template.tutorial_step2,
    spot: "#editBtn"
  },
  {
    template: Template.tutorial_step3,
    spot: "#addBtn"
  },
  {
    template: Template.tutorial_step4,
    spot: "#myBtn"
  }
];

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
  },
  tutorialEnabled: function() {
    return Session.get('tutorialEnabled')
  },
  options: {
    steps: navTutorialSteps,
    onFinish: function() {
      Session.set('tutorialEnabled', false);
    }
  }
});

Template.navbar.events({
  'click .navbar-btn': function (evt, tmpl) {
    if ($("#navbarCollapse").hasClass('in')) {
      $(".navbar-toggle").click();
    };
  },
  'click .tutorial-btn': function (evt, tmpl) {
    Session.set('tutorialEnabled', true);
  }
});