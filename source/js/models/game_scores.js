// Filename: models/project
define([
  
], function(){
  var GameScores = Backbone.Model.extend({
  id: null,
  urlRoot: "/game_scores/",
  //urlRoot: "http://localhost/test",
  fields: "[]",

  url: function(){
    if(this.get('id')){
      return this.urlRoot + this.get('id') + "/";// + "?fields=" + encodeURIComponent(this.fields);
    }else{
      return this.urlRoot;
    }
  }/*,
  toJSON: function(options) {
     return {}
  }*/

  });
  // Return the model for the module
  return GameScores;
});