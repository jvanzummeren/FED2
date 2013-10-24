// Filename: views/projects/list
define([
  // Pull in the Collection module from above
  'collections/pools',
  'collections/games',
  'text!templates/pools/list.html',
  'text!templates/games/list.html'

], function(PoolsCollection, GamesCollection, poolsListTemplate, gameListTemplate){

  

  var PoolsViews = Backbone.View.extend({
    el: $("#pools"),
    tournamentId : 'None.',
    initialize: function(){
      
      this.poolCollection = new PoolsCollection();
      this.gamesCollection = new GamesCollection();

     // this.tournamentId = options.tournamentId;
      
      /* Display a loading indication whenever the Collection is fetching.*/
      this.poolCollection.on("fetch:started", function() {
          //show loading.
          this.$el.find('#pool-content').html("");
      }, this);
    },
    success : function(fetchSuccess){
      this.fetchSuccess = fetchSuccess;
    },

    render: function(){
      //this.fetchData();
    },
    events : {
        'tap .details' : 'goToUpdateScore',
        'tap .ui-btn-left' : 'back'
    },
    back: function(){
     
      
      FED_APP.router.navigate('/', {trigger: true});
    },
    goToUpdateScore: function(e){
      $el = $(e.currentTarget);
      
      var id = $el.attr('id');
     // window.location.href = '#/game/score/'+id;
      FED_APP.router.navigate('/game/score/'+id, {trigger: true});
    },
    fetchData: function(){
      var that = this;

      this.pools = undefined;
      this.games = undefined;

      this.poolCollection.fetch({
         data: { tournament_id: this.tournamentId},
         success: function(pools){
            that.pools = pools;
            that.combinePoolsAndGames();
         }
      }); 

      this.gamesCollection.fetch({

        data: { tournament_id: this.tournamentId, limit:100},
        success: function(games){
          that.games = games;
          that.combinePoolsAndGames();
        }

      });

      return this;

    },

    combinePoolsAndGames : function(){
        if(!this.pools || !this.games) return;
  
        var that = this;

        this.pools.each(function(pool, index){
           var gamesForPool = that.games.where({pool_id: pool.get('id') });
           var groupedGames = _.groupBy(gamesForPool, function(row) {
              
                return row.get('start_day');
            });

           console.log(groupedGames);

           pool.set({grouped_games:groupedGames });
        });

        if(this.fetchSuccess){
            this.fetchSuccess();
        }
        FED_APP.poolsView.renderTemplate();
    },

    renderTemplate : function(){
      /*  var groupedPools = this.pools.groupBy( function(model){
            return model.get('name');
        });*/
        console.log(this.pools.models);
        var compiledTemplate = _.template( poolsListTemplate, {
            pools: this.pools.models, 
            gameListTemplate:gameListTemplate
        });
        console.log("Render pools?");
        this.$el.find("#pool-content").html(compiledTemplate);
    }

  });

  // Returning instantiated views can be quite useful for having "state"
  return PoolsViews;
});