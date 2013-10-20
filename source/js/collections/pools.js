// Filename: collections/projects
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
    parse: function(response) {
       return response.objects;
    },
    comparator: function(model) {
      return model.get('name');
    }

  });
  // You don't usually return a collection instantiated
  return PoolsCollection;
});