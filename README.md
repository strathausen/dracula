# Graph Dracula - a JavaScript Graph Library

[![Build Status](https://travis-ci.org/strathausen/dracula.svg?branch=master)](https://travis-ci.org/strathausen/dracula)
[![Backers on Open Collective](https://opencollective.com/dracula/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/dracula/sponsors/badge.svg)](#sponsors) 

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

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/strathausen/dracula/graphs/contributors"><img src="https://opencollective.com/dracula/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/dracula#backer)]

<a href="https://opencollective.com/dracula#backers" target="_blank"><img src="https://opencollective.com/dracula/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/dracula#sponsor)]

<a href="https://opencollective.com/dracula/sponsor/0/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/1/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/2/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/3/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/4/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/5/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/6/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/7/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/8/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/dracula/sponsor/9/website" target="_blank"><img src="https://opencollective.com/dracula/sponsor/9/avatar.svg"></a>


