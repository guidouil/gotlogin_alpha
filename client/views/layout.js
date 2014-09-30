Template.layout.events({
  'click #day': function () {
    $('body').removeClass("night");
    $('legend').removeClass("night");
    $('.well').removeClass("night");
    $('nav').removeClass("navbar-inverse");
    $('.navbar-btn').removeClass("night");
    Session.set("theme", "day");
  },
  'click #night': function () {
    $('body').addClass("night");
    $('legend').addClass("night");
    $('.well').addClass("night");
    $('nav').addClass("navbar-inverse");
    $('.navbar-btn').addClass("night");
    Session.set("theme", "night");
  }
});

Template.layout.rendered = function(){
  var currentdate = new Date();
  var hour = currentdate.getHours();
  if( hour <= 19 || hour >= 7 ) {
    $('body').removeClass("night");
    $('legend').removeClass("night");
    $('.well').removeClass("night");
    $('nav').removeClass("navbar-inverse");
    $('.navbar-btn').removeClass("night");
    Session.set("theme", "day");
  }
  if( hour > 19 || hour < 7 ) {
    $('body').addClass("night");
    $('legend').addClass("night");
    $('.well').addClass("night");
    $('nav').addClass("navbar-inverse");
    $('.navbar-btn').addClass("night");
    Session.set("theme", "night");
  }
};