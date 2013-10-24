// Filename: main.js
var FED_APP = FED_APP || {};
// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.

require.config({
  paths: {
    'jquery': 'libs/jquery/jquery-min',
    'underscore': 'libs/underscore-amd/underscore-min',
    'backbone': 'libs/backbone-amd/backbone-min',
    'jquery.mobile' : 'libs/jquery/jquery.mobile-1.3.2.min'
  },
	shim: {
	    backbone: {
	        deps: ['underscore'],
	        exports: 'Backbone'
	    },
	    underscore: {
	        exports: '_'
	    }
	}
});

require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
