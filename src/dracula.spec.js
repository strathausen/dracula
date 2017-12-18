import assert from 'assert'
import Dracula from './dracula'

describe('Dracula', () => {
  describe('#constructor', () => {
    it('exposes nodes and edges', () => {
      const graph = Dracula.create()
      assert.equal(Object.keys(graph).length, 2)
    })
  })

  describe('#addNode', () => {
    it('via string ID', () => {
      const graph = Dracula.create()
      const node = graph.addNode('bar')
      assert.deepEqual(node, { id: 'bar', edges: [] })
    })

    it('via number ID', () => {
      const graph = Dracula.create()
      const node = graph.addNode(23)
      assert.deepEqual(node, { id: 23, edges: [] })
    })

    it('via object with id', () => {
      const graph = Dracula.create()
      const node = graph.addNode({ id: 23 })
      assert.deepEqual(node, { id: 23, edges: [] })
    })

    it('via object without id', () => {
      const graph = Dracula.create()
      const node = graph.addNode({ foo: 'bar' })
      assert.deepEqual(typeof node.id, 'string')
    })

    it('via id and object', () => {
      const graph = Dracula.create()
      const node = graph.addNode(23, { foo: 'bar' })
      assert.deepEqual(node, { foo: 'bar', id: '23', edges: [] })
    })

    it('do not replace existing nodes', () => {
      const graph = Dracula.create()
      const n1 = graph.addNode('a')
      const n2 = graph.addNode('a')
      assert.strictEqual(n1, n2)
    })
  })

  describe('#removeNode', () => {
    it('via id', () => {
      const graph = Dracula.create()
      graph.addNode(23, { foo: 'bar' })
      const node = graph.removeNode(23)
      assert.deepEqual(node, { foo: 'bar', id: '23', edges: [] })
      assert.equal(Object.keys(graph.toJSON().nodes).length, 0)
    })

    it('via node instance', () => {
      const graph = Dracula.create()
      const node = graph.addNode(23, { foo: 'bar' })
      const deleted = graph.removeNode(node)
      assert.deepEqual(node, { foo: 'bar', id: '23', edges: [] })
      assert.deepEqual(deleted, { foo: 'bar', id: '23', edges: [] })
      assert.equal(Object.keys(graph.toJSON().nodes).length, 0)
    })

    it('remove node that is part of an edge', () => {
      const graph = Dracula.create()
      graph.addEdge('a', 'b')
      const removedNode = graph.removeNode('a')
      const resultNode = { id: 'a', edges: [] }
      assert.deepEqual(removedNode, resultNode)
      assert.deepEqual(graph.toJSON().edges, [])
    })
  })

  describe('#addEdge', () => {
    it('create edge', () => {
      const graph = Dracula.create()
      const edge = graph.addEdge('a', 'b')
      const result = { source: { id: 'a' }, target: { id: 'b' }, style: {} }
      result.source.edges = [result]
      result.target.edges = [result]
      assert.deepEqual(edge, result)
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })

    it('create edge with data', () => {
      const graph = Dracula.create()
      const edge = graph.addEdge('a', 'b', 'fancy')
      const result = { source: { id: 'a' }, target: { id: 'b' }, style: 'fancy' }
      result.source.edges = [result]
      result.target.edges = [result]
      assert.deepEqual(edge, result)
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })
  })

  describe('#removeEdge', () => {
    it('remove by providing two node ids', () => {
      const graph = Dracula.create()
      graph.addEdge('a', 'b')
      const removed = graph.removeEdge('a', 'b')
      const result = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} }
      assert.deepEqual(removed, result)
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove by providing two nodes', () => {
      const graph = Dracula.create()
      graph.addEdge('a', 'b')
      const removed = graph.removeEdge({ id: 'a' }, { id: 'b' })
      const resultEdge = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} }
      assert.deepEqual(removed, resultEdge)
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove by providing edge', () => {
      const graph = Dracula.create()
      const edge = graph.addEdge('a', 'b')
      const removed = graph.removeEdge(edge)
      const resultEdge = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} }
      assert.deepEqual(removed, resultEdge)
      assert.equal(Object.keys(graph.toJSON().edges).length, 0)
    })

    it('remove non-existing edge', () => {
      const graph = Dracula.create()
      graph.addEdge('a', 'b')
      const removed = graph.removeEdge('b', 'c')
      const resultEdge = { source: { id: 'a' }, target: { id: 'b' }, style: {} }
      resultEdge.source.edges = [resultEdge]
      resultEdge.target.edges = [resultEdge]
      assert.deepEqual(removed, undefined)
      assert.equal(Object.keys(graph.toJSON().edges).length, 1)
    })
  })

  describe('#toJSON', () => {
    const graph = Dracula.create()
    graph.addNode(23)
    graph.addEdge(23, 'c')
    const resultSource = { id: 23 }
    const resultTarget = { id: 'c' }
    const resultEdge = { source: resultSource, target: resultTarget, style: {} }
    resultSource.edges = [resultEdge]
    resultTarget.edges = [resultEdge]

    it('represent graph structure', () => {
      assert.deepEqual(graph.toJSON(), {
        edges: [resultEdge],
        nodes: { 23: resultSource, c: resultTarget },
      })
    })
  })
})
