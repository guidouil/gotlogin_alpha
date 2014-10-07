Template.createApp.events({
  'click .createApp': function (evt, tmpl) {
    evt.preventDefault();
    var inputUrl = tmpl.find('#inputUrl').value;
    var inputName = tmpl.find('#inputName').value;
    var inputLoginName = tmpl.find('#inputLoginName').value;
    var inputPasswordName = tmpl.find('#inputPasswordName').value;
    var inputMethod = tmpl.find('input:radio[name=radiosMethod]:checked').value;
    var inputStyle = tmpl.find('input:radio[name=radiosStyle]:checked').value;
    var inputShared = tmpl.find('input:radio[name=radiosShared]:checked').value;
    var inputImage = "";
    if (tmpl.find('input:radio[name=image]:checked')) {
        inputImage = tmpl.find('input:radio[name=image]:checked').value;
    };
    if (inputName && inputUrl) {
      var appId = Applications.insert({
        url: inputUrl,
        name: inputName,
        loginName: inputLoginName,
        passwordName: inputPasswordName,
        method: inputMethod,
        style: inputStyle,
        shared: inputShared,
        image: inputImage,
        owner: Meteor.userId()//,
        // users: [Meteor.userId()]
      });
      if (inputImage == "") {
        var file = tmpl.find('#inputImage').files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            Applications.update({_id: appId},{$set: {image: evt.target.result}});
          };
          reader.readAsDataURL(file);
        } else {
          Applications.update({_id: appId},{$set: {image: '/default-icon.png'}});
        }
      };
      Alerts.add( TAPi18n.__("msg_create_success", inputName), 'success', {fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
    };
    Router.go('listApp');
  }
});