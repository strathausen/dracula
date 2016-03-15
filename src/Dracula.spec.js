import Dracula from './Dracula'
import assert from 'assert'


describe('Dracula', () => {

  describe('#constructor', () => {
    let graph = Dracula.create()
    it('does not expose internal data', () => {
      assert.equal(Object.keys(graph).length, 0)
    })
  })

  describe('#addNode', () => {

    it('via string ID', () => {
      let graph = Dracula.create()
      let node = graph.addNode('bar')
      assert.deepEqual(graph.toJSON(), {
        edges: [],
        nodes: {
          bar: {id: 'bar'}
        }
      })
    })

    it('via number ID', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23)
      assert.deepEqual(graph.toJSON(), {
        edges: [],
        nodes: {
          23: {id: 23}
        }
      })
    })

    it('via object with id', () => {
      let graph = Dracula.create()
      let node = graph.addNode({id: 23})
      assert.deepEqual(graph.toJSON(), {
        edges: [],
        nodes: {
          23: {id: 23}
        }
      })
    })

    it('via object without id', () => {
      let graph = Dracula.create()
      let node = graph.addNode({foo: 'bar'})
      assert.deepEqual(typeof node.id, 'string')
    })

    it('via id and object', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23, {foo: 'bar'})
      assert.deepEqual(graph.toJSON(), {
        edges: [],
        nodes: {
          23: {foo: 'bar', id: '23'}
        }
      })
    })

  })

  describe('#addEdge', () => {
    
  })

  describe('#removeEdge', () => {
    
  })

})
