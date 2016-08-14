import Dracula from './dracula'
import assert from 'assert'

describe('Dracula', () => {

  describe('#constructor', () => {

    it('exposes nodes and edges', () => {
      let graph = Dracula.create()
      assert.equal(Object.keys(graph).length, 2)
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

    it('do not replace existing nodes', () => {
      let graph = Dracula.create()
      let n1 = graph.addNode('a')
      let n2 = graph.addNode('a')
      assert.strictEqual(n1, n2)
    })

  })

  describe('#removeNode', () => {

    it('via id', () => {
      let graph = Dracula.create()
      graph.addNode(23, {foo: 'bar'})
      let node = graph.removeNode(23)
      assert.deepEqual(node, {foo: 'bar', id: '23'})
      assert.equal(Object.keys(graph.toJSON().nodes).length, 0)
    })

    it('via node instance', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23, {foo: 'bar'})
      let deleted = graph.removeNode(node)
      assert.deepEqual(node, {foo: 'bar', id: '23'})
      assert.deepEqual(deleted, {foo: 'bar', id: '23'})
      assert.equal(Object.keys(graph.toJSON().nodes).length, 0)
    })

  })

  describe('#addEdge', () => {

    it('create edge', () => {
      let graph = Dracula.create()
      let edge = graph.addEdge('a', 'b')
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}})
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })

    it('create edge with data', () => {
      let graph = Dracula.create()
      let edge = graph.addEdge('a', 'b', {style: 'fancy'})
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}, style: 'fancy'})
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })

  })

  describe('#removeEdge', () => {

    it('remove by providing two node ids', () => {
      let graph = Dracula.create()
      graph.addEdge('a', 'b')
      let edge = graph.removeEdge('a', 'b')
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}})
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove by providing two nodes', () => {
      let graph = Dracula.create()
      let edge = graph.addEdge('a', 'b')
      let removed = graph.removeEdge({id: 'a'}, {id: 'b'})
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}})
      assert.deepEqual(removed, {source: {id: 'a'}, target: {id: 'b'}})
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove by providing edge', () => {
      let graph = Dracula.create()
      let edge = graph.addEdge('a', 'b')
      let removed = graph.removeEdge(edge)
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}})
      assert.deepEqual(removed, {source: {id: 'a'}, target: {id: 'b'}})
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove something else', () => {
      let graph = Dracula.create()
      let edge = graph.addEdge('a', 'b')
      let removed = graph.removeEdge('b', 'c')
      assert.deepEqual(edge, {source: {id: 'a'}, target: {id: 'b'}})
      assert.deepEqual(removed, undefined)
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })

  })

  describe('#toJSON', () => {

    it('represent graph structure', () => {
      let graph = Dracula.create()
      let node = graph.addNode(23)
      let edge = graph.addEdge(23, 'c')
      assert.deepEqual(node, {id: 23})
      assert.deepEqual(edge, {source: {id: 23}, target: {id: 'c'}})
      assert.deepEqual(graph.toJSON(), {
        edges: [{source: {id: 23}, target: {id: 'c'}}],
        nodes: {23: {id: 23}, c: {id: 'c'}},
      })
    })

  })

})
