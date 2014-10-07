Meteor.subscribe('Applications');
Meteor.subscribe('Logins');
Meteor.subscribe('Links');
Meteor.subscribe('Keys');

getUserLanguage = function () {
  var language = window.navigator.userLanguage || window.navigator.language;
  if (language.length > 2) {
    language = language.substring(0,2).toLowerCase();
  };
  Session.set('language', language);
  //return language;
};


Meteor.startup(function () {
  getUserLanguage();

  accountsUIBootstrap3.setLanguage(Session.get('language'));

  AccountsEntry.config({
    homeRoute: '/',                 // mandatory - path to redirect to after sign-out
    dashboardRoute: '/dash',      // mandatory - path to redirect to after successful sign-in
    wrapLinks: true,
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    language: Session.get('language'),
    showOtherLoginServices: true//,     // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using
  });

  Session.set("showLoadingIndicator", true);

  TAPi18n.setLanguage(Session.get('language'))
    .done(function () {
      Session.set("showLoadingIndicator", false);
    })
    .fail(function (error_message) {
      // Handle the situation
      console.log(error_message);
    });
});