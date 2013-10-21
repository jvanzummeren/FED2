
// Filename: collections/projects
define([
  // Pull in the Model module from above
  'models/game_scores'
], function(GameModel){
  var GamesCollection = Backbone.Collection.extend({
    urlRoot: "/game_scores/?limit=5&game_id=127187",
    fields: "[id, pool, start_time, team_1, team_1_score, team_2, team_2_score]",
    url: function(){
      return this.urlRoot;// + "?fields=" + encodeURIComponent(this.fields);
    },
    model: GameModel,
    parse: function(response) {
       return response.objects;
    },
    comparator: function(model) {
      return model.get('start_time');
    },

    saveAll: function( ) {
        // Loop over my collection...
        _(this.models).each( function(game_score) {
            // And POST for each object in the collection
            //if(game_score.get('is_final')){
             // game_score.save();
            //}
            //game_score.reset()
            //game_score.set({score_id:game_score.get('id')})
            game_score.destroy();
        } );
    }

  });
  // You don't usually return a collection instantiated
  return GamesCollection;
});