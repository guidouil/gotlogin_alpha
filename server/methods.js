Meteor.methods({
  get_url: function(url) {
    check(url, String);
    if (url.search('://') == -1) {
      url = 'http://'+url;
    };
    var aUrl = url.split('//');
    var aDomain = aUrl[1].split('/');
    if (url.search('ftp://') == 0 || url.search('sftp://') == 0 || url.search('ftps://') == 0) {
      var pageTitle = aDomain[0] + ' ftp';
      var formMethod = 'FTP';
    } else {
      if (url.search('http://') == 0 || url.search('https://') == 0) {
        var cheerio = Meteor.npmRequire('cheerio');
        $ = cheerio.load(Meteor.http.get(url).content);
        var pageTitle = $('title').text().trim();
        var loginName = $('input[type=text]').attr('name');
        var passwordName = $('input[type=password]').attr('name');
        var formAction = $('form').attr('action');
        var formMethod = $('form').attr('method');
        var images = new Array();
        $('img').each(function(){
          var src = $(this).attr("src");
          if (src) {
            if (src.search('http') == -1) {
              src = aUrl[0] + '//' + aDomain[0] + '/' + src;
              src = src.replace(/([^:]\/)\/+/g, "$1");
            };
            images.push(src);
          };
        });
      };
    };

    if (formMethod) {
      formMethod = formMethod.toUpperCase();
    };

    return {
      'pageUrl' : url,
      'pageTitle': pageTitle,
      'loginName': loginName,
      'passwordName': passwordName,
      'formAction': formAction,
      'formMethod': formMethod,
      'images': images
    };
  },
  delete_app: function(appId) {
    if (this.userId && appId) {
      var app = Applications.findOne({_id: appId, owner: this.userId});
      if (app) {
        Applications.remove({_id:appId});
        Logins.remove({app: appId});
        Links.remove({app: appId});
        Keys.remove({app: appId});
        return appId;
      };
      return false;
    };
    return false;
  },
  delete_login: function(loginId) {
    if (this.userId && loginId) {
      var login = Logins.findOne({_id: loginId, owner: this.userId});
      if (login && login._id) {
        // Login owner
        Logins.remove({'login': login._id});
        Keys.remove({'login': login._id});
        return login._id;
      } else {
        // Login user
        Logins.update({_id: this.app}, {$pull: {users: this.userId}});
        Keys.update({_id: this.app}, {$pull: {users: this.userId}});
      }
      return false;
    };
    return false;
  },
  sendTokenEmail: function (to, token, loginId) {
    check([to, token, loginId], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    var login = Logins.findOne({_id: loginId});
    if (login && login._id) {
      var app = Applications.findOne({_id: login.app});
      var user = Meteor.users.findOne({'_id': login.owner});
      var sharer = 'Somebody';
      if (user && user.username) {
        sharer = user.username;
      };
      if (user && user.emails ) {
        var emails = user.emails;
        for (var key in emails) {
          if (key == 0) {
            sharer = emails[0].address;
          };
        };
      };
      var subject = sharer + " wants to share " + app.name.toString() + " with you";
      var url = Meteor.absoluteUrl()+"token/"+token;
      var text = 'Hi,<br>' +
                sharer + ' wants to share a login and password with you.<br>' +
                'To get the password for <b>' + app.name.toString() + '</b> please click on the following link :<br>' +
                '<a href="' + url +'">' + url + '</a><br><br>' +
                'Happy logins,<br>' +
                'The gotLogers';
    }
    Email.send({
      to: to,
      from: 'no-reply@gotlog.in',
      subject: subject,
      html: text
    });
  },
  share_login: function(loginId, sharedEmail) {
    var sharedUser = Meteor.users.findOne({'emails.address': sharedEmail});
    if (sharedUser && sharedUser._id) {
      // user found in base, adding link
      var login = Logins.findOne({_id: loginId});
      if (login && login._id) {
        var linkOrder = Links.find({owner: sharedUser._id}).count()+1;
        Applications.update({_id: login.app}, {$addToSet: {users: sharedUser._id}});
        Logins.update({_id: login._id}, {$addToSet: {users: sharedUser._id}});
        Keys.update({'login': login._id}, {$addToSet: {users: sharedUser._id}});
        Links.insert({
          owner: sharedUser._id,
          app: login.app,
          login: login._id,
          order: linkOrder,
          sharer: this.userId
        });
        return sharedEmail;
      };
    } else {
      // user not found, make a token and send
      var zToken = make_key();
      Tokens.insert({
        token: zToken,
        email: sharedEmail,
        login: loginId,
        sharer: this.userId
      });

      Meteor.call('sendTokenEmail',
            sharedEmail,
            zToken,
            loginId);
      return sharedEmail;
    };
  },
  assoc_login: function(loginId, userId, token) {
    var login = Logins.findOne({_id: loginId});
    if (login && login._id) {
      var linkOrder = Links.find({owner: userId}).count()+1;
      Applications.update({_id: login.app}, {$addToSet: {users: userId}});
      Logins.update({_id: login._id}, {$addToSet: {users: userId}});
      Keys.update({'login': login._id}, {$addToSet: {users: userId}});
      Links.insert({
        owner: userId,
        app: login.app,
        login: login._id,
        order: linkOrder,
        sharer: login.owner
      });
      Tokens.remove({'token': token});
      return true;
    };
  },
  login_users: function(loginId) {
    var login = Logins.findOne({$and: [{_id: loginId},{owner: this.userId}]});
    return Meteor.users.find({$and: [{'_id': {$in: login.users}},{'_id':{$ne: this.userId}}]}, {fields: {username: 1, emails:1}}).fetch();
  },
  delete_shared_link: function(loginId, userId) {
    Links.remove({login: loginId, owner: userId, sharer: this.userId});
  },
  login_tokens: function(loginId) {
    return Tokens.find({login: loginId, sharer: this.userId},{fields: {email: 1}}).fetch();
  },
  delete_token: function(tokenId) {
    Tokens.remove({_id: tokenId, sharer: this.userId});
  }
});
