###
  Dracula Graph Layout and Drawing Framework 0.2.0alpha
  (c) 2011 Philipp Strathausen <strathausen@gmail.com>, http://strathausen.eu
###

###
  graph representation and layout containing many representation modes
  edges - list of edges
  nodes - list of nodes
  node.edges - list of edges that are connected to this node
###
class Graph
  constructor: () ->
    @nodes = {}
    @edges = {}
    @snapshots = []
    @type = 'graph'

  # TODO update data
  addNode: (id, data) ->
    @nodes[id] ?= new Graph.Node id, data
 
  addEdge: (source, target, data) ->
    s = @addNode source
    t = @addNode target
    edge = new Graph.Edge source, target, data
    @edges[edge._id] = edge
    s.edges[edge._id] = edge
    t.edges[edge._id] = edge
  
  # TODO take a snapshot of the current state of the graph
#  snapShot: (comment) ->
  
  removeNode: (id) ->
    delete @nodes[id]
    
    i = 0
    
    for i of [0..@edges.length-1]
      if @edges[i].source.id == id or @edges[i].target.id == id
        @edges.splice i, 1
        i--
      i++

class Graph.Edge
  constructor: (@source, @target, @data=directed:no) ->

class Graph.Node
  constructor: (@_id, @data)

#  hide: () ->
#    do shape.hide for shape in @shapes

class Graph.Renderer

class Graph.Layout

# smart cross-browser logging
log = (a...) -> console?.log a...
