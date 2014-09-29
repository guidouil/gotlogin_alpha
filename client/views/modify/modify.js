Template.modifyApp.Links = function () {
  return Links.find({},{sort: {order:1}});
};

Template.modifyApp.helpers({
  app: function () {
    return Applications.findOne({_id: this.app});
  },
  ownedLogin: function() {
    var login = Logins.findOne({_id: this.login, owner: Meteor.userId()});
    if (login && login.owner == Meteor.userId()) {
      return true;
    };
    return false;
  }
});

Template.modifyApp.events({
  'click .removeAppUser': function (evt, tmpl) {
    evt.preventDefault();
    var thisLogin = this;
    bootbox.confirm("Are you sure?", function(result) {
      if (result == true) {
        console.log(result);
        Applications.update({_id: thisLogin.app}, {$pull: {users: Meteor.userId()}});
        if (thisLogin.login != '') {
          Meteor.call('delete_login', thisLogin.login);
        };
        Links.remove({_id: thisLogin._id});
      };

    });
  }
});

SimpleRationalOrders = {
  beforeFirst: function (firstOrder) { return firstOrder - 1; },
  between: function (beforeOrder, afterOrder) { return (beforeOrder + afterOrder) / 2; },
  afterLast: function (lastOrder) { return lastOrder + 1; }
};
Template.modifyApp.rendered = function () {
  $(this.find('#list')).sortable({ // uses the 'sortable' interaction from jquery ui
    stop: function (event, ui) {
      var el = ui.item.get(0), before = ui.item.prev().get(0), after = ui.item.next().get(0);

      var newOrder;
      if (!before) { // moving to the top of the list
        newOrder = SimpleRationalOrders.beforeFirst(UI.getData(after).order);

      } else if (!after) { // moving to the bottom of the list
        newOrder = SimpleRationalOrders.afterLast(UI.getData(before).order);

      } else {
        newOrder = SimpleRationalOrders.between(
          UI.getData(before).order,
          UI.getData(after).order);
      }
      Links.update({_id: UI.getData(el)._id}, {$set: {order: newOrder}});
    }
  });
};