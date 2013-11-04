/*
 * Collection for Pools
 * External data: Leagevine /pools/
 * 
 * Loads pool data and orders it by name (Pool A, B, C, D)
 */

define([
  // Pull in the Model module from above
  'models/pool'
], function(PoolModel){
  var PoolsCollection = Backbone.Collection.extend({
  
    urlRoot: "/pools/",
    fields: "[id,name,standings]",
    url: function(){
      return this.urlRoot + "?fields=" + encodeURIComponent(this.fields);
    },
    model: PoolModel,
    //find the actual objects in response.objects 
    //deletes metadata retrieved from leagevine)
    parse: function(response) {
       return response.objects;
    },
    //order by name
    comparator: function(model) {
      return model.get('name');
    }

  });
  //Return a collection instantiated
  return PoolsCollection;
});