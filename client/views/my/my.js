Template.myApp.Applications = function () {
  return Applications.find({owner: Meteor.userId()});
};

Template.myApp.events({
  'click .removeApp': function (evt, tmpl) {
    evt.preventDefault();
    var thisApp = this;
    bootbox.confirm("Are you sure?", function(result) {
      if (result) {
        Meteor.call('delete_app', thisApp._id);
      };
    });
  }
});
