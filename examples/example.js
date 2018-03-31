var redraw

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

  var width = 600
  var height = 400

  var g = new Dracula.Graph()

  /* add a simple node */
  g.addNode("strawberry")
  g.addNode("cherry")

  /* add a node with a customized label */
  g.addNode("1", { label: "Tomato" })


  /* add a node with a customized shape
     (the Raphael graph drawing implementation can draw this shape, please
     consult the RaphaelJS reference for details http://raphaeljs.com/) */
  var render = function(r, n) {
    var label = r.text(0, 30, n.label).attr({ opacity: 0 })
    //the Raphael set is obligatory, containing all you want to display
    var set = r.set()
      .push(
        r.rect(-30, -13, 62, 86)
          .attr({ fill: '#fa8', 'stroke-width': 2, r: 9 })
      )
      .push(label)

    // make the label show only on hover
    set.hover(
      function mouseIn() {
        label.animate({ opacity: 1, 'fill-opacity': 1 }, 500)
      },
      function mouseOut() {
        label.animate({ opacity: 0 }, 300)
      }
    )

    // TODO currently not implemented
    // var tooltip = r.set()
    //   .push(
    //     r.rect(0, 0, 90, 30).attr({ fill: '#fec', 'stroke-width': 1, r: 9 })
    //   ).push(
    //     r.text(25, 15, 'overlay').attr({ fill: '#000000' })
    //   );
    // for(var i in set.items) {
    //   set.items[i].tooltip(tooltip);
    // }
    //            set.tooltip(r.set().push(r.rect(0, 0, 30, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})).hide());
    return set
  }

  g.addNode('id35', {
    label: "meat\nand\ngreed",
    /* filling the shape with a color makes it easier to be dragged */
    /* arguments: r = Raphael object, n : node object */
    render: render
  })
  // TODO not implemented yet
  //    g.addNode("Wheat", {
  /* filling the shape with a color makes it easier to be dragged */
  /* arguments: r = Raphael object, n : node object */
  //        shapes : [ {
  //                type: "rect",
  //                x: 10,
  //                y: 10,
  //                width: 25,
  //                height: 25,
  //                stroke: "#f00"
  //            }, {
  //                type: "text",
  //                x: 30,
  //                y: 40,
  //                text: "Dump"
  //            }],
  //        overlay : "<b>Hello <a href=\"http://wikipedia.org/\">World!</a></b>"
  //    });

  var st = {
    directed: true,
    label: 'Label',
    'label-style' : {
      'font-size': 20
    }
  }
  g.addEdge('kiwi', 'penguin', st)

  /* connect nodes with edges */
  g.addEdge('strawberry', 'cherry', { directed: true })
  g.addEdge('cherry', 'apple')
  g.addEdge('cherry', 'apple')
  g.addEdge('1', 'id35')
  g.addEdge('penguin', 'id35')
  g.addEdge('penguin', 'apple')
  g.addEdge('kiwi', 'id35')

  /* a directed connection, using an arrow */
  g.addEdge('1', 'cherry', { directed: true } )

  /* customize the colors of that edge */
  // TODO currently not implemented
  g.addEdge('id35', 'apple', {
    stroke: '#bfa' , fill: '#56f', label: 'Meat-to-Apple'
  })

  /* add an unknown node implicitly by adding an edge */
  g.addEdge('strawberry', 'apple')

  //g.removeNode("1");

  /* layout the graph using the Spring layout implementation */
  var layouter = new Dracula.Layout.Spring(g)

  /* draw the graph using the RaphaelJS draw implementation */
  var renderer = new Dracula.Renderer.Raphael('#paper', g, width, height)

  redraw = function() {
    layouter.layout()
    renderer.draw()
  }
  hide = function(id) {
    g.nodes[id].hide()
  }
  show = function(id) {
    g.nodes[id].show()
  };
  redraw()
}
