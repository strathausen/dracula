//Show UCLA CS class dependencies (not complete)
$(document).ready(function() {
    var width = $(document).width();
    var height = $(document).height();
    var g = new Graph();
    g.edgeFactory.template.style.directed = true;
    g.addEdge("CS 31","CS 32");
    g.addEdge("CS 32","CS 33");
    g.addEdge("CS 33","CS 35L");
    g.addNode("CS M51A");
    g.addEdge("CS 32", "CS 111");
    g.addEdge("CS 33", "CS 111");
    g.addEdge("CS 35L", "CS 111");
    g.addEdge("CS 32", "CS 118");
    g.addEdge("CS 33", "CS 118");
    g.addEdge("CS 35L", "CS 118");
    g.addEdge("CS 111", "CS 118");
    g.addEdge("CS 32", "CS 131");
    g.addEdge("CS 33", "CS 131");
    g.addEdge("CS 35L", "CS 131");
    var layouter = new Graph.Layout.Ordered(g, topological_sort(g));
    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
});