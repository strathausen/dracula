var redraw;

window.onload = function() {
    var width = $(document).width();
    var height = $(document).height() - 100;

    /* Showcase of the Bellman-Ford search algorithm finding shortest paths 
       from one point to every node */
    
    /*  */

    /* We need to write a new node renderer function to display the computed
       distance.
       (the Raphael graph drawing implementation of Dracula can draw this shape,
       please consult the RaphaelJS reference for details http://raphaeljs.com/) */
    var render = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-30, n.point[1]-13, 60, 44).attr({"fill": "#feb", r : "12px", "stroke-width" : n.distance == 0 ? "3px" : "1px" })).push(
                r.text(n.point[0], n.point[1] + 10, (n.label || n.id) + "\n(" + (n.distance == undefined ? "Infinity" : n.distance) + ")"));
            return set;
        };
    
    var g = new Graph();
    
    /* modify the edge creation to attach random weights */
    g.edgeFactory.build = function(source, target) {
	var e = jQuery.extend(true, {}, this.template);
	e.source = source;
	e.target = target;
	e.style.label = e.weight = Math.floor(Math.random() * 10) + 1;
	return e;
    }
    
    /* creating nodes and passing the new renderer function to overwrite the default one */
    g.addNode("New York", {render:render}); // TODO add currying support for nicer code
    g.addNode("Berlin", {render:render});
    g.addNode("Tel Aviv", {render:render});
    g.addNode("Tokyo", {render:render});
    g.addNode("Roma", {render:render});
    g.addNode("Madrid", {render:render});

    /* connections */
    g.addEdge("Tokyo", "Tel Aviv"/*, {weight:9, directed: true, stroke : "#bfa"}*/); // also supports directed graphs, but currently doesn't look that nice
    g.addEdge("Tokyo", "New York");
    g.addEdge("Tokyo", "Berlin");
    g.addEdge("Tel Aviv", "Berlin");
    g.addEdge("Tel Aviv", "New York");
    g.addEdge("Tel Aviv", "Roma");
    g.addEdge("Roma", "New York");
    g.addEdge("Berlin", "New York");
    g.addEdge("Madrid", "New York");
    g.addEdge("Madrid", "Roma");
    g.addEdge("Madrid", "Tokyo");

    /* random edge weights (our undirected graph is modelled as a bidirectional graph) */
/*    for(e in g.edges)
        if(g.edges[e].backedge != undefined) {
            g.edges[e].weight = Math.floor(Math.random()*10) + 1;
            g.edges[e].backedge.weight = g.edges[e].weight;
        }
*/
    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(g);
    
    /* draw the graph using the RaphaelJS draw implementation */

    /* calculating the shortest paths via Bellman Ford */
//    bellman_ford(g, g.nodes["Berlin"]);
    
    /* calculating the shortest paths via Dijkstra */
    dijkstra(g, g.nodes["Berlin"]);
    
    /* calculating the shortest paths via Floyd-Warshall */
    floyd_warshall(g, g.nodes["Berlin"]);


    /* colourising the shortest paths and setting labels */
    for(e in g.edges) {
        if(g.edges[e].target.predecessor === g.edges[e].source || g.edges[e].source.predecessor === g.edges[e].target) {
            g.edges[e].style.stroke = "#bfa";
            g.edges[e].style.fill = "#56f";
        } else {
            g.edges[e].style.stroke = "#aaa";
        }
    }
    
    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

    redraw = function() {
        layouter.layout();
        renderer.draw();
    };
    
/*    var pos=0;
    step = function(dir) {
        pos+=dir;
        var renderer = new Graph.Renderer.Raphael('canvas', g.snapshots[pos], width, height);
        renderer.draw();
    };*/
};