import assert from 'assert'
import Spring from './spring'
import Dracula from '../dracula'

describe('Spring Layout', () => {
  let graph

  it('should not crash', () => {
    graph = Dracula.create()
    graph.addEdge('a', 'b')
    Spring.create(graph)
  })

  it('have a distance between the nodes', () => {
    const { a, b } = graph.nodes
    const diffX = Math.abs(a.layoutPosX - b.layoutPosX)
    const diffY = Math.abs(a.layoutPosY - b.layoutPosY)
    assert(diffX > 0)
    assert(diffY > 0)
  })

  it('has layout props', () => {
    assert(graph.layoutMinX, 'no min x')
    assert(graph.layoutMinY, 'no min y')
    assert(graph.layoutMaxX, 'no max x')
    assert(graph.layoutMaxY, 'no max y')
  })
})
