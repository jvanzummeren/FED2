// Filename: views/projects/list

define([
  'collections/game_scores'
], function(GameScoresCollection){


  var UpdateScoreView = Backbone.View.extend({
    el: $("#content"),
    gameScoresCollection : null,
    initialize : function(){
     
      this.gameScoresCollection = new GameScoresCollection();
      /* Display a loading indication whenever the Collection is fetching.*/
      this.gameScoresCollection.on("fetch:started", function() {
          //show loading.
          this.$el.html("loading...");
      }, this);
    },

    render: function(){
        var that = this;

        this.gameScoresCollection.fetch({
          success: function(game_scores){
            that.$el.html("Retrieving games_scores");

            that.gameScoresCollection.saveAll();
            //var compiledTemplate = _.template( updateScoreTemplate,  { game:game });
            //that.$el.html(compiledTemplate);
          }
        }); 
    },

    events: {
      'click .test' : 'saveScore'
    },
    saveScore: function(ev){

    }

    
  });

  // Returning instantiated views can be quite useful for having "state"
  return UpdateScoreView;
});
