Template.dash.helpers({
  Links: function() {
    return Links.find({},{sort: {order:1}});
  },
  appLogin: function() {
    return Logins.findOne({_id: this.login});
  },
  app: function() {
    return Applications.findOne({_id: this.app});
  },
  isFtp: function (method) {
    return method == 'FTP' ? true : false;
  },
  ftpDomain: function (zUrl) {
    var aUrl = zUrl.split("://");
    return aUrl[1];
  },
  isHttp: function (method) {
    return method == 'HTTP' ? true : false;
  },
  httpUrl: function (zUrl) {
    var aUrl = zUrl.split("://");
    return aUrl[1];
  },
  httpProtocol: function (zUrl) {
    var aUrl = zUrl.split("://");
    return aUrl[0];
  },
  decryptPassword: function(password, loginId){
    var JsonFormatter = {
        parse: function (jsonStr) {
          // parse json string
          var jsonObj = JSON.parse(jsonStr);
          // extract ciphertext from json object, and create cipher params object
          var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
          });
          // optionally extract iv and salt
          if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
          }
          if (jsonObj.s) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
          }
          return cipherParams;
        }
      };
    var zKey = Keys.findOne({users: Meteor.userId(), login: loginId},{fields: {key: 1}});
    var passwordParsed = JsonFormatter.parse(password);
    var decrypted = CryptoJS.AES.decrypt(passwordParsed, zKey.key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
});