// Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'router' // Request router.js

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

    jQuery.fn.highlight = function () {
        $(this).each(function () {
            var el = $(this);
            $("<div/>")
            .width(el.outerWidth())
            .height(el.outerHeight())
            .css({
                "position": "absolute",
                "left": el.offset().left,
                "top": el.offset().top,
                "background-color": "#ffff99",
                "opacity": ".7",
                "z-index": "9999999"
            }).appendTo('body').fadeOut(10000).queue(function () { $(this).remove(); });
        });
    }

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
  
    $( document ).on( "mobileinit",
      // Set up the "mobileinit" handler before requiring jQuery Mobile's module
      function() {
        // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        $.mobile.defaultPageTransition = 'slide';        
      }
    )

    require( [ "jquery.mobile" ], function() {
        // Instantiates a new Backbone.js Mobile Router
        FED_APP.router = new Router();
    });

    
  }

  return {
    initialize: initialize
  };

});