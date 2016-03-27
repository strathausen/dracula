import Dracula from './Dracula'
import Spring from './Dracula.Spring'
import assert from 'assert'

describe('Spring Layout', () => {

  let graph

  it('should not crash', () => {
    graph = Dracula.create()
    let edge = graph.addEdge('a', 'b')
    let layout = new Spring(graph)
  })

  it('have a distance between the nodes', () => {
    let node1 = graph.nodes.a
    let node2 = graph.nodes.b
    let diffX = Math.abs(node1.layoutPosX - node2.layoutPosX)
    let diffY = Math.abs(node1.layoutPosY - node2.layoutPosY)
    assert(diffX > 0)
    assert(diffY > 0)
  })

})
