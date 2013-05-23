
var redraw;

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

  var width = 600;
  var height = 400;

  var g = new Graph();

  var render = function(r, n) {
    var label = r.text(0, 30, n.label).attr({opacity:0});
    //the Raphael set is obligatory, containing all you want to display 
    var set = r.set().push(
        r.rect(-30, -13, 62, 86)
          .attr({"fill": "#fa8",
                "stroke-width": 2
                , r : 9}))
      .push(label);
      // make the label show only on hover 
      set.hover(
        function mouseIn() {
          label.animate({opacity:1,"fill-opacity":1}, 500);
        },
        function mouseOut() {
          label.animate({opacity:0},300);
        }
      );

      tooltip = r.set()
      .push(
        r.rect(0, 0, 90, 30).attr({"fill": "#fec", "stroke-width": 1, r : 9})
      ).push(
        r.text(25, 15, "overlay").attr({"fill": "#000000"})
      );
      for(i in set.items) {
        set.items[i].tooltip(tooltip);
      };
      //            set.tooltip(r.set().push(r.rect(0, 0, 30, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})).hide());
      return set;
  };

  g.addNode("id35", {
    label : "meat\nand\ngreed",
    /* filling the shape with a color makes it easier to be dragged */
    /* arguments: r = Raphael object, n : node object */
    render : render
  });

  //g.addEdge("penguin", "id35");

  /* a directed connection, using an arrow */
  //g.addEdge("1", "cherry", { directed : true } );

  /* customize the colors of that edge */
  g.addEdge("id35", "apple", { stroke : "#bfa" , fill : "#56f", label : "Meat-to-Apple" });

  /* add an unknown node implicitly by adding an edge */
  //g.addEdge("strawberry", "apple");

  //g.removeNode("1");

  /* layout the graph using the Spring layout implementation */
  //var layouter = new Graph.Layout.Spring(g);

  /* draw the graph using the RaphaelJS draw implementation */
  var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

  redraw = function() {
    //layouter.layout();
    renderer.draw();
  };

  redraw();
};

