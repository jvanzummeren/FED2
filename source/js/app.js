// Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js

], function($, _, Backbone, Router){
 
  var initialize = function(){

    $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };


    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'https://api.leaguevine.com/v1' + options.url;
    });

    $.ajaxSetup({
        headers: {
          'Content-Type'  : "application/json; charset=utf-8",
          'Accept'        : "application/json",
          'Authorization' : "bearer 95e0ec6803"          
        }
    });


    var collectionFetch = Backbone.Collection.prototype.fetch;

    Backbone.Collection.prototype.fetch = function(options) {
        this.trigger("fetch:started");
        collectionFetch.call(this, options);
    }

    var modelFetch = Backbone.Model.prototype.fetch;

    Backbone.Model.prototype.fetch = function(options) {
        this.trigger("fetch:started");
        modelFetch.call(this, options);
    }
  
   /* Backbone.Model.extend({

      // Overwrite save function
      save: function(attrs, options) {
          options || (options = {});
          alert("Save override");
          // Filter the data to send to the server
          delete attrs.selected;
          delete attrs.dontSync;

          options.data = JSON.stringify(attrs);

          // Proxy the call to the original save function
          Backbone.Model.prototype.save.call(this, attrs, options);
      }
    });*/
    Router.initialize();
  }

  return {
    initialize: initialize
  };

});