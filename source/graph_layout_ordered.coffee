Graph.Layout.Ordered = (graph, order) ->
  @graph = graph
  @order = order
  @layout()

Graph.Layout.Ordered:: = 
  layout: ->
    @layoutPrepare()
    @layoutCalcBounds()
  
  layoutPrepare: (order) ->
    for i of @graph.nodes
      node = @graph.nodes[i]
      node.layoutPosX = 0
      node.layoutPosY = 0
    counter = 0
    for i of @order
      node = @order[i]
      node.layoutPosX = counter
      node.layoutPosY = Math.random()
      counter++
  
  layoutCalcBounds: ->
    minx = Infinity
    maxx = -Infinity
    miny = Infinity
    maxy = -Infinity
    for i of @graph.nodes
      x = @graph.nodes[i].layoutPosX
      y = @graph.nodes[i].layoutPosY
      maxx = x  if x > maxx
      minx = x  if x < minx
      maxy = y  if y > maxy
      miny = y  if y < miny
    @graph.layoutMinX = minx
    @graph.layoutMaxX = maxx
    @graph.layoutMinY = miny
    @graph.layoutMaxY = maxy

Graph.Layout.OrderedTree = (graph, order) ->
  @graph = graph
  @order = order
  @layout()

Graph.Layout.OrderedTree:: = 
  layout: ->
    @layoutPrepare()
    @layoutCalcBounds()
  
  layoutPrepare: (order) ->
    for i of @graph.nodes
      node = @graph.nodes[i]
      node.layoutPosX = 0
      node.layoutPosY = 0
    numNodes = @order.length
    totalLevels = Math.floor(Math.log(numNodes) / Math.log(2))
    counter = 1
    for i of @order
      node = @order[i]
      rank = Math.floor(Math.log(counter) / Math.log(2))
      file = counter - Math.pow(rank, 2)
      log "Node " + node.id + "  #" + counter + " is at rank " + rank + " file " + file
      node.layoutPosX = totalLevels - rank
      node.layoutPosY = file
      counter++
  
  layoutCalcBounds: ->
    minx = Infinity
    maxx = -Infinity
    miny = Infinity
    maxy = -Infinity
    for i of @graph.nodes
      x = @graph.nodes[i].layoutPosX
      y = @graph.nodes[i].layoutPosY
      maxx = x  if x > maxx
      minx = x  if x < minx
      maxy = y  if y > maxy
      miny = y  if y < miny
    @graph.layoutMinX = minx
    @graph.layoutMaxX = maxx
    @graph.layoutMinY = miny
    @graph.layoutMaxY = maxy

Graph.Layout.TournamentTree = (graph, order) ->
  @graph = graph
  @order = order
  @layout()

Graph.Layout.TournamentTree:: = 
  layout: ->
    @layoutPrepare()
    @layoutCalcBounds()
  
  layoutPrepare: (order) ->
    for i of @graph.nodes
      node = @graph.nodes[i]
      node.layoutPosX = 0
      node.layoutPosY = 0
    numNodes = @order.length
    totalLevels = Math.floor(Math.log(numNodes) / Math.log(2))
    counter = 1
    for i of @order
      node = @order[i]
      depth = Math.floor(Math.log(counter) / Math.log(2))
      xpos = counter - Math.pow(depth, 2)
      offset = Math.pow(2, totalLevels - depth)
      final_x = offset + (counter - Math.pow(2, depth)) * Math.pow(2, (totalLevels - depth) + 1)
      log "Node " + node.id + "  #" + counter + " is at depth " + depth + " offset " + offset + " final_x " + final_x
      node.layoutPosX = final_x
      node.layoutPosY = depth
      counter++
  
  layoutCalcBounds: ->
    minx = Infinity
    maxx = -Infinity
    miny = Infinity
    maxy = -Infinity
    for i of @graph.nodes
      x = @graph.nodes[i].layoutPosX
      y = @graph.nodes[i].layoutPosY
      maxx = x  if x > maxx
      minx = x  if x < minx
      maxy = y  if y > maxy
      miny = y  if y < miny
    @graph.layoutMinX = minx
    @graph.layoutMaxX = maxx
    @graph.layoutMinY = miny
    @graph.layoutMaxY = maxy
