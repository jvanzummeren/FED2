// Filename: views/projects/list
define([
  // Pull in the Collection module from above
  'collections/tournaments',
  'text!templates/tournaments/list.html'
], function(TournamentsCollection, tournamentListTemplate){

  var TournamentListView = Backbone.View.extend({
    el: $("#tournaments"),

    initialize: function(){      
      this.collection = new TournamentsCollection();
    },

    events : {
        'tap .tournament' : 'goToPools'
    },
    goToPools : function(e){
      $el = $(e.currentTarget);
      
      var id = $el.attr('id');
    
      FED_APP.router.navigate('/pools/'+id, {trigger: true});
    },
    render: function(groupedTournaments){
     
      var compiledTemplate = _.template( tournamentListTemplate, { tournament_groups: groupedTournaments } );
      this.$el.find("#tournament-content").html(compiledTemplate);
      this.$el.page('destroy').page();
    },
    success : function(fetchSuccess){
      this.fetchSuccess = fetchSuccess;
    },
    fetch : function(){
      var that = this;

      this.collection.fetch({
        success: function(tournaments, response, options){
            var groupedTournaments = that.collection.groupBy( function(model){
                return model.get('start_date');
            });

            if(that.fetchSuccess){
                that.fetchSuccess();
            }
            that.render(groupedTournaments);
          }
      });
      return this;
    }

  });

  // Returning instantiated views can be quite useful for having "state"
  return TournamentListView;
});