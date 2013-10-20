// Filename: models/project
define([
  'libs/date'
], function(){
  var GameModel = Backbone.Model.extend({
    defaults: {
      name: "Geen naam."
    },
	parse: function(resp, xhr) {
    console.log(resp);
	    resp.start_date = new Date(resp.start_time).toString('d MMMM yyyy HH:mm');
      resp.start_day = new Date(resp.start_time).toString('dddd - d MMMM yyyy');
      resp.start_time = new Date(resp.start_time).toString('HH:mm');
      
	    return resp;
	}
   
  });
  // Return the model for the module
  return GameModel;
});