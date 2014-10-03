Router.configure({
  layoutTemplate: 'layout'
});

var mustBeSignedIn = function(pause) {
    AccountsEntry.signInRequired(this);
};

Router.onBeforeAction(mustBeSignedIn, {
    except: ['entrySignIn', 'entrySignUp', 'entryForgotPassword', 'entryResetPassword', 'entryError', 'layout', 'token', 'home']
});

Router.map( function () {
	this.route('home', {
	  path: '/'
	});
  this.route('dash', {
    path: '/dash',
    template: 'dash',
    onBeforeAction: function() {
      if (! Meteor.userId()) {
        Router.go('home');
      };
    }
  })
  this.route('listApp', {
    path: '/list',
    template:'listApp'
  });
  this.route('addApp', {
    path: '/add/:_id',
    template:'addApp',
    data: function() {
      return Applications.findOne({_id: this.params._id});
    }
  });
  this.route('createApp', {
    path: '/create',
    template:'createApp'
  });
  this.route('modifyApp', {
    path: '/config',
    template: 'modifyApp'
  });
  this.route('myApp', {
    path: '/my',
    template: 'myApp'
  });
  this.route('editApp', {
    path: '/edit/:_id',
    template: 'editApp',
    data: function() {
      return Applications.findOne({_id: this.params._id});
    }
  });
  this.route('editLogin', {
    path: '/editlogin/:_id',
    template: 'editLogin',
    data: function() {
      return Logins.findOne({owner: Meteor.userId(), _id: this.params._id});
    }
  });
  this.route('shareLogin', {
    path: '/sharelogin/:_id',
    template: 'shareLogin',
    data: function() {
      return Logins.findOne({owner: Meteor.userId(), _id: this.params._id});
    }
  });
  this.route('delUserLogin', {
    path: '/deluserlogin/:loginId/:userId',
    template: 'delUserLogin',
    onBeforeAction: function() {
      var login = Logins.findOne({owner: Meteor.userId(), _id: this.params.loginId, users: this.params.userId});
      if (login && login.users) {
        Logins.update({_id: this.params.loginId}, {$pull: {users: this.params.userId}});
        Meteor.call('delete_shared_link', this.params.loginId, this.params.userId);
        Router.go('shareLogin',{_id: this.params.loginId});
      };
    }
  });
  this.route('deltoken', {
    path: '/deltoken/:loginId/:tokenId',
    template: 'deltoken',
    onBeforeAction: function() {
      var login = Logins.findOne({owner: Meteor.userId(), _id: this.params.loginId});
      if (login && login.owner == Meteor.userId()) {
        Meteor.call('delete_token', this.params.tokenId);
        Router.go('shareLogin',{_id: this.params.loginId});
      };
    }
  });
  this.route('token', {
    path: '/token/:_id',
    template: 'token',
    onBeforeAction: function() {
      this.subscribe('Tokens', this.params._id);
    },
    data: function() {
      return Tokens.findOne();
    }
  });
});