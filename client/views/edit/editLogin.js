Template.editLogin.events({
  'click .saveAppLogin': function (evt, tmpl) {
    evt.preventDefault();
    var inputLogin = tmpl.find('#inputLogin').value;
    var inputPassword = tmpl.find('#inputPassword').value;
    if (inputLogin && inputPassword) {
      var JsonFormatter = {
        stringify: function (cipherParams) {
          // create json object with ciphertext
          var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
          };
          // optionally add iv and salt
          if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
          }
          if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
          }
          // stringify json object
          return JSON.stringify(jsonObj);
        }
      };
      var zKey = Keys.findOne({users: Meteor.userId(), login: this._id},{fields: {key: 1}});
      var passwordEncrypted = CryptoJS.AES.encrypt(inputPassword, zKey.key);
      var passwordEncryptedJson = JsonFormatter.stringify(passwordEncrypted);
      Logins.update({_id: this._id}, {
        $set: {
          login: inputLogin,
          password: passwordEncryptedJson
        }
      });
    } else if(inputLogin) {
      Logins.update({_id: this._id}, {
        $set: {
          login: inputLogin
        }
      });
    };
    Alerts.add('Login updated', 'success', {fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
    Router.go('modifyApp');
  }
});

Template.editLogin.helpers({
  app: function() {
    return Applications.findOne({_id: this.app});
  }
});

Template.editLogin.rendered = function(){
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