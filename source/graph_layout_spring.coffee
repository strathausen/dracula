class Graph.Layout.Spring
  constructor: (@graph, @ratio) ->
    @iterations = 500
    @maxRepulsiveForceDistance = 6
    @k = 2
    @c = 0.01
    @maxVertexMovement = 0.5
    @layout()

  layout: ->
    @layoutPrepare()
    
    for i in [0..@iterations]
      @layoutIteration()

    @layoutCalcBounds()
  
  layoutPrepare: ->
    for node in @graph.nodes
      node.layoutPosX = 0
      node.layoutPosY = 0
      node.layoutForceX = 0
      node.layoutForceY = 0
  
  layoutCalcBounds: ->
    minx = Infinity
    maxx = -Infinity
    miny = Infinity
    maxy = -Infinity
    for node in @graph.nodes
      x = node.layoutPosX
      y = node.layoutPosY
      maxx = x  if x > maxx
      minx = x  if x < minx
      maxy = y  if y > maxy
      miny = y  if y < miny
    @graph.layoutMinX = minx
    @graph.layoutMaxX = maxx
    @graph.layoutMinY = miny
    @graph.layoutMaxY = maxy
  
  layoutIteration: ->
    prev = []

    for node1 in @graph.nodes
      for node2 in prev
        @layoutRepulsive node1, node2
      prev.push node1

    for e in @graph.edges
      @layoutAttractive edge

    for node in @graph.nodes
      xmove = @c * node.layoutForceX
      ymove = @c * node.layoutForceY
      max = @maxVertexMovement
      xmove = max  if xmove > max
      xmove = -max  if xmove < -max
      ymove = max  if ymove > max
      ymove = -max  if ymove < -max
      node.layoutPosX += xmove
      node.layoutPosY += ymove
      node.layoutForceX = 0
      node.layoutForceY = 0
  
  layoutRepulsive: (node1, node2) ->
    dx = node2.layoutPosX - node1.layoutPosX
    dy = node2.layoutPosY - node1.layoutPosY
    d2 = dx * dx + dy * dy
    if d2 < 0.01
      dx = 0.1 * Math.random() + 0.1
      dy = 0.1 * Math.random() + 0.1
      d2 = dx * dx + dy * dy
    d = Math.sqrt(d2)
    if d < @maxRepulsiveForceDistance
      repulsiveForce = @k * @k / d
      node2.layoutForceX += repulsiveForce * dx / d
      node2.layoutForceY += repulsiveForce * dy / d
      node1.layoutForceX -= repulsiveForce * dx / d
      node1.layoutForceY -= repulsiveForce * dy / d
  
  layoutAttractive: (edge) ->
    node1 = edge.source
    node2 = edge.target
    dx = node2.layoutPosX - node1.layoutPosX
    dy = node2.layoutPosY - node1.layoutPosY
    d2 = dx * dx + dy * dy
    if d2 < 0.01
      dx = 0.1 * Math.random() + 0.1
      dy = 0.1 * Math.random() + 0.1
      d2 = dx * dx + dy * dy
    d = Math.sqrt(d2)
    if d > @maxRepulsiveForceDistance
      d = @maxRepulsiveForceDistance
      d2 = d * d
    attractiveForce = (d2 - @k * @k) / @k
    edge.attraction = 1  if edge.attraction == undefined
    attractiveForce *= Math.log(edge.attraction) * 0.5 + 1
    node2.layoutForceX -= attractiveForce * dx / d
    node2.layoutForceY -= attractiveForce * dy / d
    node1.layoutForceX += attractiveForce * dx / d
    node1.layoutForceY += attractiveForce * dy / d
