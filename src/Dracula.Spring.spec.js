import Dracula from './Dracula'
import Spring from './Dracula.Spring'
import assert from 'assert'

describe('Spring Layout', () => {

  it('should not crash', () => {
    let graph = Dracula.create()
    let edge = graph.addEdge('a', 'b')
    let layout = new Spring(graph)
  })

})
