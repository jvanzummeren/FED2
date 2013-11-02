/*
* Not used?
*/

define([
  'backbone'
], function(Backbone){
  var GameScores = Backbone.Model.extend({
  id: null,
  urlRoot: "/game_scores/",
  fields: "[]",

  url: function(){
    if(this.get('id')){
      return this.urlRoot + this.get('id') + "/";// + "?fields=" + encodeURIComponent(this.fields);
    }else{
      return this.urlRoot;
    }
  }

  });
  // Return the model for the module
  return GameScores;
});