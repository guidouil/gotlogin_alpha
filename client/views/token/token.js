Template.token.helpers({
  getLogin: function () {
    if (Meteor.userId()) {
      Meteor.call('assoc_login', this.login, Meteor.userId(), this.token, function (error, result) {
        if (result) {
          Router.go('dash');
        };
      });
    } else {
      $('.alert').removeClass('hidden');
    }
  },
  url: function(token) {
    return Meteor.absoluteUrl()+"token/"+token;
  }
});