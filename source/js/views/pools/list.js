/*
* Displays a list of pools and games
* Pools ordered by name
* Games ordered by date/time
*/

define([
  'collections/pools',
  'collections/games',
  'text!templates/pools/list.html',
  'text!templates/games/list.html'

], function(PoolsCollection, GamesCollection, poolsListTemplate, gameListTemplate){

  var PoolsViews = Backbone.View.extend({
    el: $("#pools"),
    tournamentId : null,

    /**
     * Initialize PoolsView
     * Instanciate PoolsCollection and GameCollection
     * 
     * @return void
     */
    initialize: function(){

      this.poolCollection = new PoolsCollection();
      this.gamesCollection = new GamesCollection();
            
      this.poolCollection.on("fetch:started", function() {
          //Remove content on refetch
          this.$el.find('#pool-content').html("");
      }, this);
    },

    /**
     * Define interactions of this view
     */
    events : {
        'tap .details' : 'goToUpdateScore',
        'tap .ui-btn-left' : 'back',
        'touchstart .details' : 'touchbeginEvent',
        'touchend .details' : 'touchendEvent'
    },

    /**
     * Navigates back to the tournaments page
     * Used by event handler of this view
     *
     * @param  e      Backbone event object              
     * @return void
     */

    back: function(e){      
      FED_APP.router.navigate('/', {trigger: true});
    },

    /**
     * Navigates to update score page
     * Trigger event to pass game model to GameScoreView
     * 
     * @param  e      Backbone event object              
     * @return void
     */

    goToUpdateScore: function(e){
      $el = $(e.currentTarget);      
      var id = parseInt($el.attr('id'));

      var gameModel = this.games.where({id:id})[0];
      gameModel.set({tournament_id: this.tournamentId});

      this.trigger("show_game_details_clicked", gameModel);
      FED_APP.router.navigate('/game/score/'+id, {trigger: true});
    },

    /* 
     * Highlight row on tap-down
     * @return void
     */

    touchbeginEvent: function(e){
      $(e.currentTarget).addClass("active");      
    },

    /*
     * Remove highlight row on tap-up
     * @return void
     */

    touchendEvent: function(e){
      $(e.currentTarget).removeClass("active");      
    },

    /**
     * Update score of a single game by passing the score information
     * Used to update one game after the score is updated in the
     * update score page
     * 
     * @param  scoreDetails     Object             
     * @return void
     */

    updateGameScore: function(scoreDetails){
      if(!this.games) return;

      var result_text = scoreDetails.get('team_1_score') + ' - ' + scoreDetails.get('team_2_score');
      var $li = this.$el.find("#"+ scoreDetails.get('game_id'));
      $li.find('.result').html(result_text);
      $li.find('.ui-btn-inner').highlight();
      
      var gameModel = this.games.where({id:scoreDetails.get('game_id')})[0];

      gameModel.set({
        team_1_score :  scoreDetails.get('team_1_score'),
        team_2_score :  scoreDetails.get('team_2_score')
      });
    },

    /**
     * Fetch Pool and Game Data
            
     * Return itself so it can be used as Promise notation
     */
    fetchData: function(){
      var that = this;

      this.pools = undefined;
      this.games = undefined;

      //fetch pool data
      this.poolCollection.fetch({
         data: { tournament_id: this.tournamentId},
         success: function(pools){
            that.pools = pools;
            that.combinePoolsAndGames();
         }
      }); 

      //fetch gamecollection data
      this.gamesCollection.fetch({

        data: { tournament_id: this.tournamentId, limit:100},
        success: function(games){
          that.games = games;
          that.combinePoolsAndGames();
        }

      });

      return this;

    },

    /**
     * Setter for fetchSucces function wich is
     * called after the fetch is succesfull
     * 
     * @param fetchSuccess   function
     * @return void
     */

    success : function(fetchSuccess){
      this.fetchSuccess = fetchSuccess;
    },

    /**
     * Combine pools and games data by adding each game to the pool it belongs to   
     * Return itself so it can be used as Promise notation
     * 
     * @return void
     */

    combinePoolsAndGames : function(){
        //check if both pools and games are loaded before continueing
        if(!this.pools || !this.games) return;
  
        var that = this;

        this.pools.each(function(pool, index){
           var gamesForPool = that.games.where({pool_id: pool.get('id') });
           var groupedGames = _.groupBy(gamesForPool, function(row) {
              
                return row.get('start_day');
            });

           pool.set({grouped_games:groupedGames });
        });

        //call fetchSucces, used in router as complete handler
        if(this.fetchSuccess){
            this.fetchSuccess();
        }
        FED_APP.poolsView.renderTemplate();
    },

    /**
     * Render template with Underscore
     * Using renderTemplate as function instead of default Backbone render function
     * To prevent backbone from calling render before both games and pools are loaded
     *
     * @return void
     */

    renderTemplate : function(){     
        
        var compiledTemplate = _.template( poolsListTemplate, {
            pools: this.pools.models, 
            gameListTemplate:gameListTemplate
        });
        
        this.$el.find("#pool-content").html(compiledTemplate);

        this.$el.page('destroy').page();

    }

  });

  //return the View
  return PoolsViews;
});