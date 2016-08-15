'use strict';

/* eslint-disable */

/*
        Bellman-Ford

    Path-finding algorithm, finds the shortest paths from one node to all nodes.


        Complexity

    O( |E| · |V| ), where E = edges and V = vertices (nodes)


        Constraints

    Can run on graphs with negative edge weights as long as they do not have
    any negative weight cycles.

 */
function bellman_ford(g, source) {
  var i = void 0,
      l = void 0;

  /* STEP 1: initialisation */
  for (var n in g.nodes) {
    g.nodes[n].distance = Infinity;
  }

  /* predecessors are implicitly zero */
  source.distance = 0;

  step('Initially, all distances are infinite and all predecessors are null.');

  /* STEP 2: relax each edge (this is at the heart of Bellman-Ford) */
  /* repeat this for the number of nodes minus one */
  for (i = 1, l = g.nodes.length; i < l; i++) {

    /* for each edge */
    for (var e in g.edges) {
      var edge = g.edges[e];
      if (edge.source.distance + edge.weight < edge.target.distance) {
        step('Relax edge between ' + edge.source.id + ' and ' + edge.target.id + '.');
        edge.target.distance = edge.source.distance + edge.weight;
        edge.target.predecessor = edge.source;
      }
      // Added by Jake Stothard (Needs to be tested)
      // if(!edge.style.directed) {
      // if(edge.target.distance + edge.weight < edge.source.distance) {
      // g.snapShot("Relax edge between " + edge.target.id + " and " + edge.source.id + ".");
      // edge.source.distance = edge.target.distance + edge.weight;
      // edge.source.predecessor = edge.target;
      // }
      // }
    }
  }step('Ready.');

  /* STEP 3: TODO Check for negative cycles */
  /* For now we assume here that the graph does not contain any negative
     weights cycles. (this is left as an excercise to the reader[tm]) */
}