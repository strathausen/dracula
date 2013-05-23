[![build status](https://secure.travis-ci.org/strathausen/dracula.png)](http://travis-ci.org/strathausen/dracula)
# Graph Dracula - a JavaScript Graph Library

Graph Dracula is a set of tools to display and layout interactive graphs,
along with various related algorithms.

No Flash, no Java, no plug-ins. Just plain JavaScript and SVG.

The code is released under the MIT license, so commercial use is not a problem.

Creating a graph is simple! You can also customise anything easily.

The code looks like this:

    var g = new Graph();
    
    g.addEdge('strawberry', 'cherry');

    var layouter = new Graph.Layout.Spring();
    layouter.layout();

    var renderer = new Graph.Renderer.Raphael('#canvas', g, 400, 300);
    renderer.draw();

## Contributors

Thanks to these people for contributing.

- Grigory Kruglov https://twitter.com/#!/lunafiko https://github.com/grigoryk/dracula-js-fork
- Johann Philipp Strathausen <strathausen-at-gmail-dot-com> http://www.strathausen.eu
- Dave Hoover <dave.hoover@gmail.com>
- Aslak Hellesoy <aslak.hellesoy@gmail.com>

Have I forgot anybody? Write me! strathausen-at-gmail-dot-com
