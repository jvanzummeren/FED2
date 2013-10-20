define(["collections/pools","collections/games","text!templates/pools/list.html","text!templates/games/list.html"],function(e,t,n,r){var i=Backbone.View.extend({el:$("#content"),tournamentId:"None.",initialize:function(n){this.poolCollection=new e,this.gamesCollection=new t,this.tournamentId=n.tournamentId,this.poolCollection.on("fetch:started",function(){this.$el.html("loading...")},this)},render:function(){this.fetchData()},fetchData:function(){var e=this;this.pools=undefined,this.games=undefined,this.poolCollection.fetch({data:{tournament_id:this.tournamentId},success:function(t){e.pools=t,e.combinePoolsAndGames()}}),this.gamesCollection.fetch({data:{tournament_id:this.tournamentId,limit:100},success:function(t){e.games=t,e.combinePoolsAndGames()}})},combinePoolsAndGames:function(){if(!this.pools||!this.games)return;var e=this;this.pools.each(function(t,n){var r=e.games.where({pool_id:t.get("id")}),i=_.groupBy(r,function(e){return e.get("start_day")});console.log(i),t.set({grouped_games:i})}),this.renderTemplate()},renderTemplate:function(){console.log(this.pools.models);var e=_.template(n,{pools:this.pools.models,gameListTemplate:r});this.$el.html(e)}});return i});