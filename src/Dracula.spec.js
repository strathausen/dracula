import Dracula from './Dracula'
import assert from 'assert'


describe('Dracula', () => {

  describe('#constructor', () => {

    it('does not expose internal data', () => {
      let graph = Dracula.create()
      assert.equal(Object.keys(graph).length, 0)
    })

  })

  describe('#addNode', () => {

    it('via string ID', () => {
      let graph = Dracula.create()
      let node = graph.addNode('bar')
      assert.deepEqual(node, {id: 'bar'})
    })

    it('via number ID', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23)
      assert.deepEqual(node, {id: 23})
    })

    it('via object with id', () => {
      let graph = Dracula.create()
      let node = graph.addNode({id: 23})
      assert.deepEqual(node, {id: 23})
    })

    it('via object without id', () => {
      let graph = Dracula.create()
      let node = graph.addNode({foo: 'bar'})
      assert.deepEqual(typeof node.id, 'string')
    })

    it('via id and object', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23, {foo: 'bar'})
      assert.deepEqual(node, {foo: 'bar', id: '23'})
    })

  })

  describe('#removeNode', () => {

    it('via id', () => {
      let graph = Dracula.create()
      graph.addNode(23, {foo: 'bar'})
      let node = graph.removeNode(23)
      assert.deepEqual(node, {foo: 'bar', id: '23'})
      assert.deepEqual(node.toJSON().nodes.length, 9)
    })

    it('via node instance', () => {
      
    })

  })

  describe('#addEdge', () => {
    
  })

  describe('#removeEdge', () => {
    
  })

  describe('#toJSON', () => {

    it('represent graph structure', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23)
      assert.deepEqual(graph.toJSON(), {
        edges: [],
        nodes: {
          23: {id: 23}
        }
      })
    })

  })

})
