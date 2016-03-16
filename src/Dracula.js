import uuid from 'uuid'

// testing for string or number data type
let isId = x => !!~['string', 'number'].indexOf(typeof x)
let edges = Symbol('edges')
let nodes = Symbol('nodes')
let getNode = Symbol('getNode')

/**
 * Graph Data Structure
 */
export default class Dracula {

  constructor() {
    this[nodes] = {}
    this[edges] = []
  }

  /**
   * Creator for the new haters :)
   */
  static create() {
    return new Dracula
  }

  /**
   * Add or update node
   * @param {string|number|object} id or node data
   * @param {object|} nodeData (optional)
   * @returns {Dracula.Node} the new node
   */
  addNode(id, nodeData) {
    // shorthands
    if (!nodeData) {
      nodeData = isId(id) ? {id} : id
    } else {
      nodeData.id = id
    }
    if (!nodeData.id) {
      nodeData.id = uuid()
    }
    this[nodes][nodeData.id] = nodeData
    return nodeData
  }

  /**
   * @param {string|number|object} source node or ID
   * @param {string|number|object} target node or ID
   * @param {object|} (optional) edge data, e.g. styles
   */
  addEdge(source, target, edgeData={}) {
    let sourceNode = this.addNode(source)
    let targetNode = this.addNode(target)
    edgeData.source = sourceNode
    edgeData.target = targetNode
    this.edges.push(edgeData)
    return edgeData
  }

  /**
   * @param {string|number|Node} node node or ID
   * @return {Node}
   */
  removeNode(node) {
    let id = isId(node) ? node : node.id
    node = this[nodes][id]
    // Delete node from index
    delete this[nodes][id]
    // Delete node from all the edges
    this[edges] = this[edges].filter(edge => (
      edge.source !== node && edge.target !== node
    ))
  }

  removeEdge(source, target) {
    this[edges] = this[edges].filter(edge => (
      edge.source !== source && edge.target !== target
    ))
  }

  toJSON() {
    return {nodes: this[nodes], edges: this[edges]}
  }

  [getNode](node) {
    return this[nodes][node.id || node]
  }

}


class Node {

  constructor(opts) {
    this.pos = opts.pos || [opts.x, opts.y]
  }

  get x() {
    return this.pos[0]
  }

  get y() {
    return this.pos[1]
  }

}

class Edge {

  constructor(opts) {
    this.weight = opts.weight
  }

}
