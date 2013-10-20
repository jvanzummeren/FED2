// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/menu/menu',
  'views/tournaments/list',
  'views/pools/list'
], function($, _, Backbone, MenuView, TournamentView, PoolsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes 
      'tournaments': 'showTournaments',
      'games/:id': 'showGames',
      'pools/:id' : 'showPools',
      '': 'showTournaments'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    var menu = new MenuView();    


    app_router.on('route:showPools', function(id){
      menu.tournamentId = id;
      menu.render();
      var poolsView = new PoolsView({tournamentId:id});
      poolsView.render();

    });

    app_router.on('route:showTournaments', function(){
        menu.remove();
        var tournamentView = new TournamentView();
        tournamentView.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
