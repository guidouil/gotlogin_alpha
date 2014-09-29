Applications = new Meteor.Collection("applications");

Applications.allow({
  insert: function (userId, doc) {
    return (doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    if (_.contains(fields, 'name') || _.contains(fields, 'url') || _.contains(fields, 'loginName') || _.contains(fields, 'passwordName') || _.contains(fields, 'method') || _.contains(fields, 'style') || _.contains(fields, 'shared') || _.contains(fields, 'image')) {
      return doc.owner === userId;
    };
    if (_.contains(fields, 'users')) {
      return userId;
    };
    return false;
  },
  remove: function (userId, doc) {
    return doc.owner === userId;
  },
  fetch: ['owner', 'users']
});

Applications.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

Logins = new Meteor.Collection("logins");

Logins.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    if (_.contains(fields, 'login') || _.contains(fields, 'password')) {
      return doc.owner === userId;
    };
    if (_.contains(fields, 'users')) {
      return (userId && (doc.owner === userId || _.contains(doc.users, userId)));
    };
    return false;
  },
  remove: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  fetch: ['owner', 'users']
});

Logins.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

Links = new Meteor.Collection("links");

Links.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && doc.owner === userId);
  },
  remove: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  fetch: ['owner']
});

Links.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

Keys = new Meteor.Collection("keys");

Keys.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    if (_.contains(fields, 'users')) {
      return (userId && (doc.owner === userId || _.contains(doc.users, userId)));
    };
    return false;
  },
  remove: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  fetch: ['owner', 'users']
});

Keys.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

Tokens = new Meteor.Collection("tokens");

Tokens.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && doc.owner === userId);
  },
  remove: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  fetch: ['owner']
});

Tokens.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});