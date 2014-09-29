Template.shareLogin.helpers({
  app: function () {
    return Applications.findOne({_id: this.app});
  }
});

Template.shareLogin.events({
  'click .shareLogin': function (evt, tmpl) {
    evt.preventDefault();
    var inputEmail = tmpl.find('#inputEmail').value;
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = regex.test(inputEmail);
    if (validEmail) {
      Meteor.call('share_login', this._id, inputEmail , function (error, result) {
        if (result == inputEmail) {
          Alerts.add('Successfully shared with '+inputEmail, 'success');
        };
      });
    };
  }
});

Template.shareLogin.rendered = function(){
  if (Session.get('theme') != '') {
    if (Session.equals('theme', 'day')) {
      $('.well').removeClass("night");
      $('legend').removeClass("night");
    };
    if (Session.equals('theme', 'night')) {
      $('.well').addClass("night");
      $('legend').addClass("night");
    };
  };
};