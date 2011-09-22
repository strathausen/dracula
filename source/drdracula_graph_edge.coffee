class AbstractEdge

AbstractEdge::hide: ->
  @connection.fg.hide()
  @connection.bg?.hide()

EdgeFactory = ->
  @template = new AbstractEdge()
  @template.style =
    directed: no
  @template.weight = 1

EdgeFactory::build: (source, target) ->
  e = jQuery.extend(true, {}, @template)
  e.source = source
  e.target = target
