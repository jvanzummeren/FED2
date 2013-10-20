define([
  'jquery',
  'underscore',
  'backbone'
 ],function(){
	 //temp location for fetch event
	  var collectionFetch = Backbone.Collection.prototype.fetch;

	  Backbone.Collection.prototype.fetch = function(options) {
	      this.trigger("fetch:started");
	      collectionFetch.call(this, options);
	  }

});