// Filename: collections/projects
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
    parse: function(response) {
       return response.objects;
    },
    comparator: function(model) {
      return model.get('start_date');
    }

  });

  // You don't usually return a collection instantiated
  return TournamentCollection;
});