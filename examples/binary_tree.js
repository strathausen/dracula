//don't lose the prototype when we get rid of the mouse events.
var p = Graph.Renderer.Raphael.prototype;

Graph.Renderer.Raphael = function(element, graph, width, height) {
    this.width = width || 400;
    this.height = height || 400;
    var selfRef = this;
    this.r = Raphael(element, this.width, this.height);
    this.radius = 40; /* max dimension of a node */
    this.graph = graph;
    this.mouse_in = false;

    /* TODO default node rendering function */
    if(!this.graph.render) {
        this.graph.render = function() {
            return;
        }
    }
    this.draw();
};
//put it back ;)
Graph.Renderer.Raphael.prototype = p;


//custom render function, to be used as the default for every node
var render = function(r, n) {
    /* the Raphael set is obligatory, containing all you want to display */
    var set = r.set().push(
        /* custom objects go here */
        r.rect(n.point[0]-30, n.point[1]-13, 50, 50)
            .attr({"fill": "#fa8", "stroke-width": 2, r : "9px"}))
            .push(r.text(n.point[0], n.point[1] + 15, n.id)
                .attr({"font-size":"20px"}));
    /* custom tooltip attached to the set */
    set.items.forEach(
        function(el) {
            el.tooltip(r.set().push(r.rect(0, 0, 30, 30)
                .attr({"fill": "#fec", "stroke-width": 1, r : "9px"})))});
    return set;
};



$(document).ready(function() {
	//make our render function the default
	Graph.Renderer.defaultRenderFunc = render;
	
    var width = $(document).width();
    var height = $(document).height();
    g = new Graph();
    g.edgeFactory.template.style.directed = true;
    g.addEdge(2, 1);
    g.addEdge(3, 1);
    g.addEdge(5, 2);
    g.addEdge(4, 2);
    g.addEdge(7, 3);
    g.addEdge(6, 3);
    g.addEdge(8, 4);
    g.addEdge(9, 4);
    g.addEdge(10, 5);
    g.addEdge(11, 5);
    g.addEdge(12, 6);
    g.addEdge(13, 6);
    g.addEdge(14, 7);
    g.addEdge(15, 7);

    var layouter = new Graph.Layout.TournamentTree(g, nodeid_sort(g));
    
    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
});