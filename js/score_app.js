
var SCORE_APP = SCORE_APP || {}; // namespace



(function (){
	requirejs.config({
	    urlArgs: "bust=" + (new Date()).getTime()
	});

	requirejs(['ready.min', 'mustache', 'qwery.min', 'routie.min'],
	function (domready, Mustache, qwery) {
		
		
		SCORE_APP.application = {
			init : function(){
				SCORE_APP.routing.init();
			}
		};

		SCORE_APP.routing = {
			init : function(){
			
				//define routes (pages)
				routie({
				    'schedule': function() {
				    	SCORE_APP.pages.showSchedulePage();
			   		},
			   		'ranking' : function(){
			   			SCORE_APP.pages.showRankingPage();
			   		},
			   		'game, *': function() {				    		    	
				    	SCORE_APP.pages.showGamePage();
				    }
				});
			}
		};

		SCORE_APP.pages = {
			showGamePage : function(){
				require(['text!template/game.html', 'data/game.data'], function(template, data){

					SCORE_APP.pages.navigation.setActiveMenuItem(0);

					var templateContainer = qwery('#template_container')[0];
					templateContainer.innerHTML = Mustache.render(template, data);		
				});
				
			},
			showSchedulePage : function(){
				require(['text!template/schedule.html', 'data/schedule.data'], function(template, data){

					SCORE_APP.pages.navigation.setActiveMenuItem(1);

					var templateContainer = qwery('#template_container')[0];
					templateContainer.innerHTML = Mustache.render(template, data);		
				});

			},
			showRankingPage : function(){
				require(['text!template/ranking.html', 'data/ranking.data'], function(template, data){

					SCORE_APP.pages.navigation.setActiveMenuItem(2);

					var templateContainer = qwery('#template_container')[0];					
					templateContainer.innerHTML = Mustache.render(template, data);		
				});
			},

			navigation : {
				setActiveMenuItem : function(menuIndex){
					var nav = qwery('.nav li');
					 for(var i=0; i < nav.length; i++) {
					   var li = nav[i];
					   li.className = '';
					}

					nav[menuIndex].className = 'active';

				}

			}

		};

		domready(function(){
			SCORE_APP.application.init();
		});

	});
})();









