// Filename: router.js
define([
  'views/menu/menu',
  'views/tournaments/list',
  'views/pools/list',
  'views/games/update_score',
  'views/games/remove_scores'
], function(MenuView, TournamentView, PoolsView, UpdateGameScore, RemoveScores) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes 
      'pools/:id'        : 'showPools',
      'game/score/:id'   : 'updateGameScore',
      'tournaments'      : 'showTournaments',
      'remove_scores'    : 'removeScores',      
      ''                 : 'showTournaments'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter();
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

    app_router.on('route:updateGameScore', function(id){
        menu.remove();
        var updateGameScore = new UpdateGameScore({id:id});
        updateGameScore.render();
    });

    app_router.on('route:removeScores', function(){
        menu.remove();
        var removeScores = new RemoveScores();
        removeScores.render();
    });

    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };

});
