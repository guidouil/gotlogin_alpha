Meteor.subscribe('Applications');
Meteor.subscribe('Logins');
Meteor.subscribe('Links');
Meteor.subscribe('Keys');

Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',                 // mandatory - path to redirect to after sign-out
    dashboardRoute: '/dash',      // mandatory - path to redirect to after successful sign-in
    wrapLinks: true,
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    language: 'en',
    showOtherLoginServices: true//,     // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using
  });
});

getUserLanguage = function () {
  var language = window.navigator.userLanguage || window.navigator.language;
  return language;
};

Meteor.startup(function () {
  Session.set("showLoadingIndicator", true);

  TAPi18n.setLanguage(getUserLanguage())
    .done(function () {
      Session.set("showLoadingIndicator", false);
    })
    .fail(function (error_message) {
      // Handle the situation
      console.log(error_message);
    });
});