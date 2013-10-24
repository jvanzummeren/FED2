// Filename: views/projects/list

define([
  'text!templates/games/update_score.html',
  'models/game',
  'models/game_scores'
], function(updateScoreTemplate, Game, GameScores){


  var UpdateScoreView = Backbone.View.extend({
    el: $("#update_score"),
    id : null,
    gameModel : null,
    initialize : function(){
      
      this.gameModel = new Game();
      /* Display a loading indication whenever the Collection is fetching.*/
      this.gameModel.on("fetch:started", function() {
          //show loading.
        //  this.$el.html("loading...");
      }, this);
    },
    success : function(fetchSuccess){
      this.fetchSuccess = fetchSuccess;
    },
    render: function(game){
      var compiledTemplate = _.template( updateScoreTemplate,  { game:game });
      this.$el.find('#score-content').html(compiledTemplate);
    },
    fetch : function(){
        var that = this;
        this.gameModel.id = this.id;
        this.gameModel.fetch({
          success: function(game){

            if(that.fetchSuccess){
                that.fetchSuccess();
            }
            that.render(game);
          }
        }); 
        return this;
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
