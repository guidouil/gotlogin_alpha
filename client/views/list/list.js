Template.listApp.helpers({
  AppsList: function () {
    return Applications.find({$or:[{shared: '1'},{owner: Meteor.userId()}, {users: Meteor.userId()}]});
  }
});