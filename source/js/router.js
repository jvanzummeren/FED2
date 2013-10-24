// Filename: router.js
define([
  'views/menu/menu',
  'views/tournaments/list',
  'views/pools/list',
  'views/games/update_score'
], function(MenuView, TournamentView, PoolsView, UpdateGameScore) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes 
      'pools/:id'        : 'showPools',
      'game/score/:id'   : 'updateGameScore',
      'tournaments'      : 'showTournaments',
      'remove_scores'    : 'removeScores',      
      ''                 : 'showTournaments'
    }, 
    initialize : function(){
      //FED_APP.menu = new MenuView();   
      console.log("router initialize");
      FED_APP.tournamentView = new TournamentView();
      FED_APP.updateGameScore = new UpdateGameScore();
      FED_APP.poolsView = new PoolsView();


      Backbone.history.start();
    },

    showPools : function(id){
      console.log("show pools");
     
      

      FED_APP.poolsView.tournamentId = id;
      FED_APP.poolsView.render();
      FED_APP.poolsView.fetchData().success( function() {
        $.mobile.loading( "hide" );       
    
      } );

      $.mobile.changePage( "#pools" , { reverse: false, changeHash: false, transition:"slide"  } );
      $.mobile.loading( "show" );
    },

    showTournaments : function(){

      FED_APP.tournamentView = new TournamentView();
      $.mobile.loading( "show" );
      FED_APP.tournamentView.fetch().success(function(){
        $.mobile.loading( "hide" );
      });
       $.mobile.changePage( "#tournaments" , { reverse: true, changeHash: false, transition:"slide" } );
    },

    updateGameScore : function(id){

      //FED_APP.updateGameScore = new UpdateGameScore({id:id});
      FED_APP.updateGameScore.id = id;
      FED_APP.updateGameScore.fetch().success(function(){

      });

      $.mobile.changePage( "#update_score" , { reverse: false, changeHash: false, transition:"flip"  } );

    }
  });
  


  return AppRouter;

});
