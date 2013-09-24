
var SCORE_APP = SCORE_APP || {}; // namespace

(function (){
	requirejs.config({
	    urlArgs: "bust=" + (new Date()).getTime()
	});

	requirejs(['ready.min', 'mustache', 'routie.min'],
	function (domready, Mustache) {
		
		
		
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

					var templateContainer = document.getElementById('template_container');
					templateContainer.innerHTML = Mustache.render(template, data);		
				});
				
			},
			showSchedulePage : function(){
				require(['text!template/schedule.html', 'data/schedule.data'], function(template, data){

					var templateContainer = document.getElementById('template_container');
					templateContainer.innerHTML = Mustache.render(template, data);		
				});

			},
			showRankingPage : function(){
				require(['text!template/ranking.html', 'data/ranking.data'], function(template, data){

					var templateContainer = document.getElementById('template_container');
					
					templateContainer.innerHTML = Mustache.render(template, data);		
				});
			}

		};

		domready(function(){
			SCORE_APP.application.init();
		});

	});
})();









