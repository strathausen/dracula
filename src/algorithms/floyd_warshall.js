/* eslint-disable */

/* All-Pairs-Shortest-Paths */
/* Runs at worst in O(|V|³) and at best in Omega(|V|³) :-)
   complexity Sigma(|V|²) */
/* This implementation is not yet ready for general use, but works with the
   Dracula graph library. */
function floyd_warshall(g, source) {

  /* Step 1: initialising empty path matrix (second dimension is implicit) */
  let path = [];
  let next = [];
  let n = g.nodes.length;
  let i, j, k, e;

  /* construct path matrix, initialize with Infinity */
  for (j in g.nodes) {
    path[j] = [];
    next[j] = [];
    for (i in g.nodes)
      path[j][i] = j === i ? 0 : Infinity;
  }

  /* initialize path with edge weights */
  for (e in g.edges)
    path[g.edges[e].source.id][g.edges[e].target.id] = g.edges[e].weight;

  /* Note: Usually, the initialisation is done by getting the edge weights
     from a node matrix representation of the graph, not by iterating through
     a list of edges as done here. */

  /* Step 2: find best distances (the heart of Floyd-Warshall) */
  for (k in g.nodes) {
    for (i in g.nodes) {
      for (j in g.nodes)
        if (path[i][j] > path[i][k] + path[k][j]) {
          path[i][j] = path[i][k] + path[k][j];

          /* Step 2.b: remember the path */
          next[i][j] = k;
        }
    }
  }

  /* Step 3: Path reconstruction, get shortest path */
  function getPath(i, j) {
    if (path[i][j] === Infinity)
      throw 'There is no path.';
    let intermediate = next[i][j];
    if (intermediate === undefined)
      return null;
    else
      return getPath(i, intermediate)
        .concat([intermediate])
        .concat(getPath(intermediate, j));
  }

  /* TODO use the knowledge, e.g. mark path in graph */
}
