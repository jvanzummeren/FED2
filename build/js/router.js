define(["jquery","underscore","backbone","views/menu/menu","views/tournaments/list","views/pools/list"],function(e,t,n,r,i,s){var o=n.Router.extend({routes:{tournaments:"showTournaments","games/:id":"showGames","pools/:id":"showPools","":"showTournaments"}}),u=function(){var e=new o,t=new r;e.on("route:showPools",function(e){t.tournamentId=e,t.render();var n=new s({tournamentId:e});n.render()}),e.on("route:showTournaments",function(){t.remove();var e=new i;e.render()}),n.history.start()};return{initialize:u}});