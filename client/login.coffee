Template.entrySignIn.rendered  = ->
  intervalId = Meteor.setInterval ->
    if Meteor.user() and Router.current().path is '/sign-in'
      Meteor.clearInterval intervalId
      Router.go AccountsEntry.settings.dashboardRoute
  , 100
