# Graph Dracula - a JavaScript Graph Library

[![Build Status](https://travis-ci.org/strathausen/dracula.svg?branch=master)](https://travis-ci.org/strathausen/dracula)

Graph Dracula is a set of tools to display and layout interactive graphs,
along with various related algorithms.

Based on JavaScript and SVG.

The code is released under the MIT license, so commercial use is not a problem.

Creating a graph is simple! You can also customise anything easily.

First, install the dependencies:

    npm install --save graphdracula raphael
    jspm install npm:graphdracula

Second, create an html file with a tag having the ID `paper`.

Third, require graphdracula (via browserify or webpack):

```js
var Dracula = require('graphdracula');

var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;

var graph = new Graph();

graph.addEdge('Banana', 'Apple');
graph.addEdge('Apple', 'Kiwi');
graph.addEdge('Apple', 'Dragonfruit');
graph.addEdge('Dragonfruit', 'Banana');
graph.addEdge('Kiwi', 'Banana');

var layout = new Layout(graph)
var renderer = new Renderer('#paper', graph, 400, 300);
renderer.draw()
```

## How To Develop

```
npm i
npm start
```
