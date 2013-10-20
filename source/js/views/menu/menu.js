// Filename: views/projects/list
define([
  'text!templates/menu/menu.html'
], function(menuTemplate){


  var menuItems = [{
    name: "Games",
    url: "#/games"
  },
  {
    name: "Schedule",
    url: "#/schedule"
  },
  {
    name: "Rankings",
    url: "#/ranking"
  }]

  var MenuView = Backbone.View.extend({
    el: $("#menu"),
    tournamentId : 'None.',
    initialize: function(){
    },
    render: function(){
        var compiledTemplate = _.template( menuTemplate,  { menu_items: menuItems, tournamentId:this.tournamentId });

        this.$el.html(compiledTemplate);
     },
     remove: function(){
        this.$el.html('');
     }
    
  });

  // Returning instantiated views can be quite useful for having "state"
  return MenuView;
});