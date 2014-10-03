Template.appForm.events({
  'click .saveLogin': function (evt, tmpl) {
    $('.loginInfo').fadeIn("fast");
  },
  'click .hideLogin' : function (evt, tmpl) {
    $('.loginInfo').fadeOut("fast");
  },
  'blur #inputUrl': function (evt, tmpl) {
    var url = tmpl.find('#inputUrl').value;
    var urlRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    if (urlRegExp.test(url)) {
      Meteor.call('get_url', url, function (error, result) {
        if (result) {
          if (result.pageUrl) {
            $('#inputUrl').val(result.pageUrl.toString());
          };
          if (result.pageTitle) {
            $('#inputName').val(result.pageTitle.toString());
          };
          if (result.loginName) {
            $('#inputLoginName').val(result.loginName.toString());
          };
          if (result.passwordName) {
            $('#inputPasswordName').val(result.passwordName.toString());
          };
          if (result.images) {
            $('#images').html("");
            for (var i = 0; i < result.images.length; i++) {
              $('#images').append('<div class="col-md-2"><label for="image-' + i + '"><div class="thumbnail"><img src="' + result.images[i] + '"><div class="caption"><p><input type="radio" name="image" value="' + result.images[i] + '" id="image-' + i + '"> Select</p></div></div></label></div>');
            };
          };
          if(result.formMethod) {
            $('#httpMethodLabel').removeClass('active');
            $('#getMethodLabel').removeClass('active');
            $('#postMethodLabel').removeClass('active');
            $('#ftpMethodLabel').removeClass('active');
            $('.loginInfo').fadeOut("fast");
            if(result.formMethod.toString() == 'POST' && result.passwordName) {
              $('#postMethodLabel').addClass('active');
              $('#method-1').attr('checked', 'checked');
              $('.loginInfo').fadeIn("fast");
            } else if(result.formMethod.toString() == 'GET' && result.passwordName) {
              $('#getMethodLabel').addClass('active');
              $('#method-0').attr('checked', 'checked');
              $('.loginInfo').fadeIn("fast");
            } else if(result.formMethod.toString() == 'FTP') {
              $('#ftpMethodLabel').addClass('active');
              $('#method-2').attr('checked', 'checked');
            } else {
              $('#httpMethodLabel').addClass('active');
              $('#method-3').attr('checked', 'checked');
            }
          };
        } else {
          console.log(error);
        }
      });
    };
  }
});

Template.appForm.rendered = function(){
  var currentRoute = Router.current();
  if(currentRoute.lookupTemplate() === 'createApp') {
    $('#defaultStyleLabel').addClass('active');
    $('#style-0').prop("checked", true);
    $('#httpMethodLabel').addClass('active');
    $('#method-3').prop("checked", true);
    $('#isSharedLabel').addClass('active');
    $('#shared-0').prop("checked", true);
  }
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

Template.appForm.helpers({
  isSharedActive: function() {
    return this.shared == 1 ? 'active' : '';
  },
  isSharedChecked: function() {
    return this.shared == 1 ? 'checked' : '';
  },
  isNotSharedActive: function() {
    return this.shared == 0 ? 'active' : '';
  },
  isNotSharedChecked: function() {
    return this.shared == 0 ? 'checked' : '';
  },
  isHttpActive: function() {
    return this.method == 'HTTP'? 'active' : '';
  },
  isHttpChecked: function() {
    return this.method == 'HTTP'? 'checked' : '';
  },
  isGetActive: function() {
    return this.method == 'GET'? 'active' : '';
  },
  isGetChecked: function() {
    return this.method == 'GET'? 'checked' : '';
  },
  isPostActive: function() {
    return this.method == 'POST'? 'active' : '';
  },
  isPostChecked: function() {
    return this.method == 'POST'? 'checked' : '';
  },
  isFtpActive: function() {
    return this.method == 'FTP'? 'active' : '';
  },
  isFtpChecked: function() {
    return this.method == 'FTP'? 'checked' : '';
  },
  defaultStyleActive: function() {
    return this.style == 'btn-default'? 'active' : '';
  },
  defaultStyleChecked: function() {
    return this.style == 'btn-default'? 'checked' : '';
  },
  primaryStyleActive: function() {
    return this.style == 'btn-primary'? 'active' : '';
  },
  primaryStyleChecked: function() {
    return this.style == 'btn-primary'? 'checked' : '';
  },
  infoStyleActive: function() {
    return this.style == 'btn-info'? 'active' : '';
  },
  infoStyleChecked: function() {
    return this.style == 'btn-info'? 'checked' : '';
  },
  successStyleActive: function() {
    return this.style == 'btn-success'? 'active' : '';
  },
  successStyleChecked: function() {
    return this.style == 'btn-success'? 'checked' : '';
  },
  warningStyleActive: function() {
    return this.style == 'btn-warning'? 'active' : '';
  },
  warningStyleChecked: function() {
    return this.style == 'btn-warning'? 'checked' : '';
  },
  dangerStyleActive: function() {
    return this.style == 'btn-danger'? 'active' : '';
  },
  dangerStyleChecked: function() {
    return this.style == 'btn-danger'? 'checked' : '';
  }
});