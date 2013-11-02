/*
 * Collection for Tournaments
 * External data: Leagevine /tournaments/
 * 
 * Loads tournament data and orders it by start_date
 */

define([
  // Pull in the Model module from above
  'models/tournament',
], function(TournamentModel){
  var TournamentCollection = Backbone.Collection.extend({
    urlRoot: "/tournaments/",
    fields: "[id, name,start_date]",
    model: TournamentModel,

    url: function(){
      return this.urlRoot + "?fields=" + encodeURIComponent(this.fields);
    },
   //find the actual objects in response.objects 
    //deletes metadata retrieved from leagevine)
    parse: function(response) {
       return response.objects;
    },
    //order by start_date
    comparator: function(model) {
      return model.get('start_date');
    }

  });

  // Return a collection instantiated
  return TournamentCollection;
});