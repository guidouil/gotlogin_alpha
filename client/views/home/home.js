Template.home.rendered = function () {
  if (Session.get('theme') != '') {
    if (Session.equals('theme', 'day')) {
      $('.well').removeClass("night");
    };
    if (Session.equals('theme', 'night')) {
      $('.well').addClass("night");
    };
  };
};