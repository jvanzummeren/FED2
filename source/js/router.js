// Filename: router.js
define([
  'views/tournaments/list',
  'views/pools/list',
  'views/games/update_score'
], function(TournamentView, PoolsView, UpdateGameScore) {
  
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

      console.log("router initialize");
      FED_APP.tournamentView = new TournamentView();
      FED_APP.updateGameScore = new UpdateGameScore();
      FED_APP.poolsView = new PoolsView();

      FED_APP.poolsView.on("show_game_details_clicked", function(gameModel) {
          console.log("passing game model:" );
          console.log(gameModel);
          FED_APP.updateGameScore.gameModel = gameModel;
      });

      FED_APP.updateGameScore.on("game_score_updated", function(scoreDetails) {
          FED_APP.poolsView.updateGameScore(scoreDetails);
      });

      

      Backbone.history.start();
    },

    showPools : function(id){
      FED_APP.updateGameScore.gameModel = null;

      var reverse = (FED_APP.updateGameScore.id) ? true : false;
      
      if(reverse){
        FED_APP.updateGameScore.id = null;
      }

      $.mobile.changePage( "#pools" , { reverse: reverse, changeHash: false, transition:"slide"  } );

      if(!reverse && FED_APP.poolsView.tournamentId != id || !FED_APP.poolsView.tournamentId){

        FED_APP.poolsView.tournamentId = id;
        FED_APP.poolsView.render();
        FED_APP.poolsView.fetchData().success( function() {
            $.mobile.loading( "hide" );
        } );

        $.mobile.loading( "show" );
      }
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

      FED_APP.updateGameScore.id = id;
      console.log(FED_APP.updateGameScore.gameModel);
      if(!FED_APP.updateGameScore.gameModel){
        console.log("Retrieve gamescore by ajax");
        FED_APP.updateGameScore.fetch().success(function(){

        });
      }else{
        console.log("render game score from passed model");
        FED_APP.updateGameScore.render();
      }

      $.mobile.changePage( "#update_score" , { reverse: false, changeHash: false, transition:"slide"  } );

    }
  });

  return AppRouter;

});
