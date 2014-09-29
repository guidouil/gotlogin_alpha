Template.addApp.events({
  'click .saveLogin': function (evt, tmpl) {
    //evt.preventDefault();
    var saveLoginIsChecked = $(".saveLogin").prop('checked');
    if(saveLoginIsChecked) {
        $('.loginInfo').fadeIn("fast");
    } else {
        $('.loginInfo').fadeOut("fast");
    }
  },
  'click .addApp': function (evt, tmpl) {
    evt.preventDefault();
    var inputLogin = tmpl.find('#inputLogin').value;
    var inputPassword = tmpl.find('#inputPassword').value;
    var zKey = "";
    if( inputLogin != '' && inputPassword != '' ){
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
      zKey = make_key();
      var passwordEncrypted = CryptoJS.AES.encrypt(inputPassword, zKey);
      var passwordEncryptedJson = JsonFormatter.stringify(passwordEncrypted);
      var loginId = null;
      loginId = Logins.insert({
        login: inputLogin,
        password: passwordEncryptedJson,
        owner: Meteor.userId(),
        app: this._id,
        users: [Meteor.userId()]
      });
      Keys.insert({
        owner: Meteor.userId(),
        users: [Meteor.userId()],
        app: this._id,
        login: loginId,
        key: zKey
      });
    }

    Applications.update(
      {_id:this._id},
      {
        $addToSet: {users: Meteor.userId()}
      }
    );

    var linkOrder = Links.find().count() + 1;
    Links.insert({
      owner: Meteor.userId(),
      app: this._id,
      login: loginId,
      order: linkOrder
    });
    Alerts.add('Link to ' + this.name + ' sucessfully added', 'success');
    Router.go('dash');
  }
});

Template.addApp.helpers({
  isNotHttp: function () {
    return this.method != 'HTTP' ? true : false;
  }
});

Template.addApp.rendered = function(){
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