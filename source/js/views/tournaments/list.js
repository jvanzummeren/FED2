// Filename: views/projects/list
define([
  // Pull in the Collection module from above
  'collections/tournaments',
  'text!templates/tournaments/list.html'
], function(TournamentsCollection, tournamentListTemplate){

  var TournamentListView = Backbone.View.extend({
    el: $("#content"),
    initialize: function(){
      
      this.collection = new TournamentsCollection();
     
      /* Display a loading indication whenever the Collection is fetching.*/
      this.collection.on("fetch:started", function() {
          //show loading.
          console.log("fetch started, show loading");
          //this.$el.html("loading...");
      }, this);

      var that = this;

      this.collection.fetch({
        success: function(tournaments, response, options){
             that.render();
          }
      })

    },

    render: function(){
     
      console.log("render template..");
      console.log(this.collection);
      var groupedTournaments = this.collection.groupBy( function(model){
          return model.get('start_date');
      });
     

       var compiledTemplate = _.template( tournamentListTemplate, { tournament_groups: groupedTournaments } );
       this.$el.html(compiledTemplate);
    }


  });

  // Returning instantiated views can be quite useful for having "state"
  return TournamentListView;
});