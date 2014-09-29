Template.loginUsers.helpers({
  users: function () {
    if (this._id != undefined) {
      var loginId = this._id;
      var output = '';
      Meteor.call('login_users', loginId, function (error, result) {
        if (result != '') {
          for (var key in result) {
            output += '<tr><td class="text-success">Sharing</td><td>'+result[key].emails[0].address+'</td><td><a class="btn  btn-xs btn-danger" href="/deluserlogin/'+loginId+'/'+result[key]._id+'">Unshare</a></td></tr>';
          };
          if(output != '') {
            $('#userstable').removeClass('hidden');
            $('#users').html(output);
          } else {
            $('#userstable').addClass('hidden');
          };
        };
      });
      Meteor.call('login_tokens', loginId, function (error, result) {
        if (result != '') {
          for (var key in result) {
            output += '<tr><td class="text-warning">Pending</td><td>'+result[key].email+'</td><td><a class="btn  btn-xs btn-danger" href="/deltoken/'+loginId+'/'+result[key]._id+'">Unshare</a></td></tr>';
          };
          if(output != '') {
            $('#userstable').removeClass('hidden');
            $('#users').html(output);
          } else {
            $('#userstable').addClass('hidden');
          };
        };
      });

    };
  }
});