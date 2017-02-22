/* global Dracula, dijkstra */

window.onload = function () {
  const width = 400;
  const height = 300;

  /* Showcase of the Bellman-Ford search algorithm finding shortest paths
     from one point to every node */

  /* We need to write a new node renderer function to display the computed
     distance.
     (the Raphael graph drawing implementation of Dracula can draw this shape,
     please consult the RaphaelJS reference for details http://raphaeljs.com/) */
  const render = function (r, n) {
    const frame = r.rect(n.point[0] - 30, n.point[1] - 13, 60, 44);
    frame.attr({
      fill: '#feb',
      r: 12,
      'stroke-width': (n.distance === 0 ? '3px' : '1px'),
    });

    /* the Raphael set is obligatory, containing all you want to display */
    const set = r.set().push(frame,
        /* custom objects go here */
        r.text(n.point[0], n.point[1] + 10, `${n.label || n.id}\n(${n.distance === undefined ? 'Infinity' : n.distance})`));
    return set;
  };

  const g = new Dracula.Graph();

  /* creating nodes and passing the new renderer function to overwrite the default one */
  const addNode = function (name) {
    g.addNode(name, { render });
  }

  /* modify the addEdge function to attach random weights */
  const addEdge = function (from, to, edgeData) {
    edgeData = edgeData || {}
    edgeData.weight = Math.floor(Math.random() * 10) + 1;
    edgeData.label = edgeData.weight;
    edgeData.style = { 'pointer-events': 'none' }
    g.addEdge(from, to, edgeData);
  };

  addNode('New York');
  addNode('Berlin');
  addNode('Tel Aviv');
  addNode('Tokyo');
  addNode('Bucharest');
  addNode('Madrid');

  /* connections */
  addEdge('Tokyo', 'Tel Aviv');
  addEdge('Tokyo', 'New York');
  addEdge('Tokyo', 'Berlin');
  addEdge('Tel Aviv', 'Berlin');
  addEdge('Tel Aviv', 'New York');
  addEdge('Tel Aviv', 'Bucharest');
  addEdge('Bucharest', 'New York');
  addEdge('Berlin', 'New York');
  addEdge('Madrid', 'New York');
  addEdge('Madrid', 'Bucharest');
  addEdge('Madrid', 'Tokyo');

  /* layout the graph using the Spring layout implementation */
  const layouter = new Dracula.Layout.Spring(g);

  /* draw the graph using the RaphaelJS draw implementation */

  /* calculating the shortest paths via Bellman Ford */
  // bellman_ford(g, g.nodes["Berlin"]);

  /* calculating the shortest paths via Dijkstra */
  dijkstra(g, g.nodes.Berlin);

  /* calculating the shortest paths via Floyd-Warshall */
  // floyd_warshall(g, g.nodes['Berlin']);


  /* colourising the shortest paths and setting labels */
  g.edges.forEach((e) => {
    if (e.target.predecessor === e.source || e.source.predecessor === e.target) {
      e.style.stroke = '#bfa';
      e.style.fill = '#56f';
    } else {
      e.style.stroke = '#aaa';
    }
  });

  const renderer = new Dracula.Renderer.Raphael(document.getElementById('canvas'), g, width, height);
  renderer.draw()

  window.redraw = function () {
    layouter.layout();
    renderer.draw();
  };
};
