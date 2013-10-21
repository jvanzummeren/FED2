// Filename: models/project
define([
  'libs/date'
], function(){
  var GameModel = Backbone.Model.extend({
  id: null,
  urlRoot: "/games/",
  fields: "[id, pool, start_time, team_1, team_1_score, team_2, team_2_score]",
  url: function(){
    return this.urlRoot + this.id + "/";// + "?fields=" + encodeURIComponent(this.fields);
  },

  initialize: function(options){
    this.id = options.id;
  },

	parse: function(resp, xhr) {

	    resp.start_date = new Date(resp.start_time).toString('d MMMM yyyy HH:mm');
      resp.start_day = new Date(resp.start_time).toString('dddd - d MMMM yyyy');
      resp.start_time = new Date(resp.start_time).toString('HH:mm');
      
	    return resp;
	}
   
  });
  // Return the model for the module
  return GameModel;
});