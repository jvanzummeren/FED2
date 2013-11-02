/*
* Used by collection/games as part of the collection
* Used view/game/update_score as single game
*
* Parses date as a readably format
*/

define([
  'libs/date'
], function(){
  var GameModel = Backbone.Model.extend({
  //game id
  id: null,
  urlRoot: "/games/",
  fields: "[id, pool, start_time, team_1, team_1_score, team_2, team_2_score]",
  //adds game id to url to retrieve one game
  url: function(){
    return this.urlRoot + this.id + "/";// + "?fields=" + encodeURIComponent(this.fields);
  },
  //add readable dataformat to response
	parse: function(resp, xhr) {
	    resp.start_date = new Date(resp.start_time).toString('d MMMM yyyy HH:mm'); // i.e. 21 oktober 2013 9:00
      resp.start_day = new Date(resp.start_time).toString('dddd - MMMM d, yyyy'); //i.e. Monday - October 21, 2013
      resp.start_time = new Date(resp.start_time).toString('HH:mm');//i.e. 09:00
      
	    return resp;
	}
   
  });
  // Return the model for the module
  return GameModel;
});