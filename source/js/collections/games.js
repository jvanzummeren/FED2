
// Filename: collections/projects
define([
  // Pull in the Model module from above
  'models/Game'
], function(GameModel){
  var GamesCollection = Backbone.Collection.extend({
    urlRoot: "/games/",
    fields: "[id, pool, start_time, team_1, team_1_score, team_2, team_2_score]",
    url: function(){
      return this.urlRoot + "?fields=" + encodeURIComponent(this.fields);
    },
    model: GameModel,
    parse: function(response) {
       return response.objects;
    },
    comparator: function(model) {
      return model.get('start_time');
    }
  });
  // You don't usually return a collection instantiated
  return GamesCollection;
});