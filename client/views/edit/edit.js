Template.editApp.events({
  'click .saveApp': function (evt, tmpl) {
    evt.preventDefault();
    var inputName = tmpl.find('#inputName').value;
    var inputUrl = tmpl.find('#inputUrl').value;
    var inputLoginName = tmpl.find('#inputLoginName').value;
    var inputPasswordName = tmpl.find('#inputPasswordName').value;
    var inputMethod = tmpl.find('input:radio[name=radiosMethod]:checked').value;
    var inputStyle = tmpl.find('input:radio[name=radiosStyle]:checked').value;
    var inputShared = tmpl.find('input:radio[name=radiosShared]:checked').value;
    var inputImage = "";
    if (tmpl.find('input:radio[name=image]:checked')) {
        inputImage = tmpl.find('input:radio[name=image]:checked').value;
    };
    if(!inputImage) {inputImage = this.image};
    if (inputName && inputUrl) {
      Applications.update(
        {_id:this._id},
        {
          $set: {
            name: inputName,
            url: inputUrl,
            loginName: inputLoginName,
            passwordName: inputPasswordName,
            method: inputMethod,
            style: inputStyle,
            shared: inputShared,
            image: inputImage
          }
        }
      );
      Alerts.add('Button for ' + inputName + ' sucessfully updated', 'success', {fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
    }

    Router.go('myApp');
  }
});