import Dracula from './Dracula'
import Spring from './Dracula.Spring'
import assert from 'assert'

describe('Spring Layout', () => {

  let graph

  it('should not crash', () => {
    graph = Dracula.create()
    graph.addEdge('a', 'b')
    Spring.create(graph)
  })

  it('have a distance between the nodes', () => {
    let {a, b} = graph.nodes
    let diffX = Math.abs(a.layoutPosX - b.layoutPosX)
    let diffY = Math.abs(a.layoutPosY - b.layoutPosY)
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
