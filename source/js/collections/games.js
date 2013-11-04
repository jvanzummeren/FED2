/*
 * Collection for Games
 * External data: Leagevine /games/
 * 
 * Loads game data and orders it by start_time
 */

define([
  // Pull in the Model module from above
  'models/game'
], function(GameModel){
  var GamesCollection = Backbone.Collection.extend({
    urlRoot: "/games/",
    fields: "[id, pool, start_time, team_1, team_1_score, team_2, team_2_score]",
    url: function(){
      return this.urlRoot + "?fields=" + encodeURIComponent(this.fields);
    },
    model: GameModel,
    //find the actual objects in response.objects 
    //deletes metadata retrieved from leagevine)
    parse: function(response) {
       return response.objects;
    },
    //order game by start_time
    comparator: function(model) {
      return model.get('start_time');
    }
  });

  // return a collection instantiated
  return GamesCollection;
});