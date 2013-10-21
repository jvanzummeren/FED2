// Filename: views/projects/list

define([
  'text!templates/games/update_score.html',
  'models/game',
  'models/game_scores'
], function(updateScoreTemplate, Game, GameScores){


  var UpdateScoreView = Backbone.View.extend({
    el: $("#content"),
    id : null,
    gameModel : null,
    initialize : function(options){
      this.id = options.id;
      this.gameModel = new Game({id: this.id});
      /* Display a loading indication whenever the Collection is fetching.*/
      this.gameModel.on("fetch:started", function() {
          //show loading.
          this.$el.html("loading...");
      }, this);
    },

    render: function(){
        var that = this;

        this.gameModel.fetch({
          success: function(game){
            var compiledTemplate = _.template( updateScoreTemplate,  { game:game });
            that.$el.html(compiledTemplate);
          }
        }); 
    },

    events: {
      'click .test' : 'saveScore'
    },
    saveScore: function(ev){
      alert("save");
      var gameScores = new GameScores();

      var scoreDetails = $('.edit-score-form').serializeObject();
      var gameScores = new GameScores();
      gameScores.save(scoreDetails, {
          
          success: function(scoreDetails){
            alert("wauw..");
            //router.navigate('', {trigger: true});
          }
      });

      return false;
    }

    
  });

  // Returning instantiated views can be quite useful for having "state"
  return UpdateScoreView;
});
