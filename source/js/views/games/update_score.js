/*
* Displays update score form
* Posts score data to Leagevine API
*
*/

define([
  'text!templates/games/update_score.html',
  'models/game',
  'models/game_scores'
], function(updateScoreTemplate, Game, GameScores){


  var UpdateScoreView = Backbone.View.extend({
    el: $("#update_score"),
    id : null,
    gameModel : null,

    /**
     * Render template with Underscore
     *
     * @return void
     */
    render: function(){
      var game = this.gameModel;

      var compiledTemplate = _.template( updateScoreTemplate,  { game:game });
      this.$el.find('#score-content').html(compiledTemplate);
    },

    /**
     * Tell gameModel to fetch scores
     * Render update score form
     * Return itself so it can be used as Promise notation
     * i.e. .fetch().succes(function)
     *
     * @return this
     */
    fetch : function(){
        var that = this;
        this.gameModel = new Game();
        this.gameModel.id = this.id;
        this.gameModel.fetch({
          success: function(game){

            if(that.fetchSuccess){
                that.fetchSuccess();
            }
            that.render();
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
     * Define interactions of this view
     */
    events: {
      'click .btn' : 'saveScore',
      'tap .ui-btn-left' : 'back'
    },

    /**
     * Navigates back to the pools page
     * Used by event handler of this view
     *
     * @param  e      Backbone event object              
     * @return void
     */

    back : function(e){
      console.log(this.gameModel);
      var tournament_id = this.gameModel.get('tournament_id');
      FED_APP.router.navigate('/pools/'+tournament_id, {trigger: true});
    },

    /**
     * Saves the score by posting the form to leagevine API
     * Used by event handler of this view
     *
     * @param  e      Backbone event object              
     * @return false  Avoid default form submit
     */

    saveScore: function(e){
      $.mobile.loading( "show" );
     
      var that = this;
      var gameScores = new GameScores();

      var scoreDetails = $('.edit-score-form').serializeObject();
      var gameScores = new GameScores();
      gameScores.save(scoreDetails, {
          
          success: function(scoreDetails){
            console.log("Score details:");
            console.log(scoreDetails);

            that.trigger("game_score_updated", scoreDetails);

            $.mobile.loading( "hide" );
            that.back();
          }
      });

      return false;
    }

    
  });

  //return the View
  return UpdateScoreView;
});
