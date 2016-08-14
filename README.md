# Graph Dracula - a JavaScript Graph Library

Graph Dracula is a set of tools to display and layout interactive graphs,
along with various related algorithms.

No Flash, no Java, no plug-ins. Just plain JavaScript and SVG.

The code is released under the MIT license, so commercial use is not a problem.

Creating a graph is simple! You can also customise anything easily.

The code looks like this:

    var g = new Graph();

    g.addEdge('strawberry', 'cherry');

    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();

    var renderer = new Graph.Renderer.Raphael('canvas', g, 400, 300);
    renderer.draw();

## How To Develop

```
npm i
npm start
```
