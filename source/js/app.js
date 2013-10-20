// Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'utils',

], function($, _, Backbone, Router, Utils){
 

  var initialize = function(){
    
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'https://api.leaguevine.com/v1' + options.url;
    });
     
    Router.initialize();
  }

  return {
    initialize: initialize
  };

});