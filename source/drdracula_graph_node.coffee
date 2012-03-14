Graph.Node = (id, node={}) ->
  node.id = id
  node.edges = []

  node.hide = ->
    @hidden = true
    @shape?.hide()
    for edge in @edges
      edge.hide?() if edge.source.id == id or edge.target == id
  
  node.show = ->
    @hidden = false
    @shape?.show()
    for edge in @edges
      edge.show?() if edge.source.id == id or edge.target == id
      
  node
