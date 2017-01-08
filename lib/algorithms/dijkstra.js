'use strict';

/* eslint-disable */

/*
   Path-finding algorithm Dijkstra

   - worst-case running time is O((|E| + |V|) · log |V| ) thus better than
     Bellman-Ford for sparse graphs (with less edges), but cannot handle
     negative edge weights
 */
function dijkstra(g, source) {

  /* initially, all distances are infinite and all predecessors are null */
  for (var n in g.nodes) {
    g.nodes[n].distance = Infinity;
  } /* predecessors are implicitly null */

  // g.snapShot('Initially, all distances are infinite and all predecessors are null.');

  source.distance = 0;

  /* set of unoptimized nodes, sorted by their distance (but a Fibonacci heap
     would be better) */
  var q = new BinaryMinHeap(g.nodes, 'distance');

  /* pointer to the node in focus */
  var node = void 0;

  /* get the node with the smallest distance
     as long as we have unoptimized nodes. q.min() can have O(log n). */
  while (q.min() !== undefined) {

    /* remove the latest */
    node = q.extractMin();
    node.optimized = true;

    /* no nodes accessible from this one, should not happen */
    if (node.distance === Infinity) throw 'Orphaned node!';

    /* for each neighbour of node */
    node.edges.forEach(function (e) {
      var other = node === e.target ? e.source : e.target;

      if (other.optimized) {
        return;
      }

      /* look for an alternative route */
      var alt = node.distance + e.weight;

      /* update distance and route if a better one has been found */
      if (alt < other.distance) {

        /* update distance of neighbour */
        other.distance = alt;

        /* update priority queue */
        q.heapify();

        /* update path */
        other.predecessor = node;
        // g.snapShot('Enhancing node.');
      }
    });
  }
}