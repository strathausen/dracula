class Graph.Renderer.Raphael
  constructor: (element, graph, @width=400, @height=400) ->
    selfRef = this
    @r = Raphael(element, @width, @height)
    @radius = 40
    @graph = graph

    @dragger = (e) ->
      @dx = e.clientX
      @dy = e.clientY
      selfRef.isDrag = this
      @set and @set.animate("fill-opacity": .1, 200) and @set.toFront()
      e.preventDefault and e.preventDefault()
  
    d = document.getElementById(element)
    d.onmousemove = (e) ->
      e = e or window.event
      if selfRef.isDrag
        bBox = selfRef.isDrag.set.getBBox()
        newX = e.clientX - selfRef.isDrag.dx + (bBox.x + bBox.width / 2)
        newY = e.clientY - selfRef.isDrag.dy + (bBox.y + bBox.height / 2)
        clientX = e.clientX - (if newX < 20 then newX - 20 else (if newX > selfRef.width - 20 then newX - selfRef.width + 20 else 0))
        clientY = e.clientY - (if newY < 20 then newY - 20 else (if newY > selfRef.height - 20 then newY - selfRef.height + 20 else 0))
        selfRef.isDrag.set.translate clientX - Math.round(selfRef.isDrag.dx), clientY - Math.round(selfRef.isDrag.dy)
        for i of selfRef.graph.edges
          selfRef.graph.edges[i].connection and selfRef.graph.edges[i].connection.draw()
        selfRef.isDrag.dx = clientX
        selfRef.isDrag.dy = clientY
  
    d.onmouseup = ->
      selfRef.isDrag and selfRef.isDrag.set.animate("fill-opacity": .6, 500)
      selfRef.isDrag = false
  
    @draw()


Graph.Renderer.defaultRenderFunc = (r, node) ->
  color = Raphael.getColor()
  ellipse = r.ellipse(0, 0, 30, 20).attr(
    fill: color
    stroke: color
    "stroke-width": 2
  )
  ellipse.node.id = node.label or node.id
  shape = r.set().push(ellipse).push(r.text(0, 30, node.label or node.id))
  shape

Graph.Renderer.Raphael:: = 
  translate: (point) ->
    [ (point[0] - @graph.layoutMinX) * @factorX + @radius, (point[1] - @graph.layoutMinY) * @factorY + @radius ]
  
  rotate: (point, length, angle) ->
    dx = length * Math.cos(angle)
    dy = length * Math.sin(angle)
    [ point[0] + dx, point[1] + dy ]
  
  draw: ->
    @factorX = (@width - 2 * @radius) / (@graph.layoutMaxX - @graph.layoutMinX)
    @factorY = (@height - 2 * @radius) / (@graph.layoutMaxY - @graph.layoutMinY)
    for i of @graph.nodes
      @drawNode @graph.nodes[i]
    i = 0
    
    while i < @graph.edges.length
      @drawEdge @graph.edges[i]
      i++
  
  drawNode: (node) ->
    point = @translate([ node.layoutPosX, node.layoutPosY ])
    node.point = point
    if node.shape
      oBBox = node.shape.getBBox()
      opoint = 
        x: oBBox.x + oBBox.width / 2
        y: oBBox.y + oBBox.height / 2
      
      node.shape.translate Math.round(point[0] - opoint.x), Math.round(point[1] - opoint.y)
      @r.safari()
      return node
    
    node.render = Graph.Renderer.defaultRenderFunc  unless node.render
      if node.shapes
    shape = node.render(@r, node).hide()
    shape.attr "fill-opacity": .6
    shape.items.forEach (item) ->
      item.set = shape
      item.node.style.cursor = "move"
    
    shape.mousedown @dragger
    box = shape.getBBox()
    shape.translate Math.round(point[0] - (box.x + box.width / 2)), Math.round(point[1] - (box.y + box.height / 2))
    node.hidden or shape.show()
    node.shape = shape
  
  drawEdge: (edge) ->
    return  if edge.backedge
    if edge.source.hidden or edge.target.hidden
      edge.connection and edge.connection.fg.hide() | edge.connection.bg and edge.connection.bg.hide()
      return
    unless edge.connection
      edge.style and edge.style.callback and edge.style.callback(edge)
      edge.connection = @r.connection(edge.source.shape, edge.target.shape, edge.style)
      return
    edge.connection.fg.show()
    edge.connection.bg and edge.connection.bg.show()
    edge.connection.draw()

Raphael.el.tooltip = (tp) ->
  @tp = tp
  @tp.o = 
    x: 0
    y: 0
  
  @tp.hide()
  @hover (event) ->
    @mousemove (event) ->
      @tp.translate event.clientX - @tp.o.x, event.clientY - @tp.o.y
      @tp.o = 
        x: event.clientX
        y: event.clientY
    
    @tp.show().toFront()
  , (event) ->
    @tp.hide()
    @unmousemove()
  
  this

