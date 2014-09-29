Meteor.publish('Applications', function () {
  return Applications.find({$or:[{users: this.userId}, {owner: this.userId}, {shared: '1'}]});
});
Meteor.publish('Logins', function () {
  return Logins.find({$or:[{users: this.userId}, {owner: this.userId}]});
});
Meteor.publish('Links', function () {
  return Links.find({owner: this.userId},{sort:{'order':1}});
});
Meteor.publish('Keys', function () {
  return Keys.find({$or:[{users: this.userId}, {owner: this.userId}]});
});
Meteor.publish('Tokens', function (inputToken) {
  return Tokens.find({token: inputToken});
});