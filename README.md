# Graph Dracula - a JavaScript Graph Library

[![Build Status](https://travis-ci.org/strathausen/dracula.svg?branch=master)](https://travis-ci.org/strathausen/dracula)

Graph Dracula is a set of tools to display and layout interactive graphs,
along with various related algorithms.

Based on JavaScript and SVG.

The code is released under the MIT license, so commercial use is not a problem.

Creating a graph is simple! You can also customise anything easily.

1. install the dependencies:

        npm install --save graphdracula raphael
    or
        jspm install npm:graphdracula

2. create an html file with a tag having the ID `paper`.

3. require graphdracula (via browserify or webpack):

```js
var Dracula = require('graphdracula')

var Graph = Dracula.Graph
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring

var graph = new Graph()

graph.addEdge('Banana', 'Apple')
graph.addEdge('Apple', 'Kiwi')
graph.addEdge('Apple', 'Dragonfruit')
graph.addEdge('Dragonfruit', 'Banana')
graph.addEdge('Kiwi', 'Banana')

var layout = new Layout(graph)
var renderer = new Renderer('#paper', graph, 400, 300)
renderer.draw()
```

## How To Develop

```
git clone git@github.com:strathausen/dracula.git
cd dracula
npm install
npm start
```
Point your browser to one of examples in `examples/`.
