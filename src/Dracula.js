import uuid from 'uuid'

// testing for string or number data type
let isId = x => !!~['string', 'number'].indexOf(typeof x)
let edges = Symbol('edges')
let nodes = Symbol('nodes')

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
   * @argument {string|number|object} id or node data
   * @argument {object|} nodeData (optional)
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
   * @argument {string|number|object} source node or ID
   * @argument {string|number|object} target node or ID
   * @argument {object|} (optional) edge data
   */
  addEdge(source, target, edgeData={}) {
    let sourceNode = this.addNode(source)
    let targetNode = this.addNode(target)
    edgeData.source = sourceNode
    edgeData.target = targetNode
    this.edges.push(edgeData)
  }

  /**
   * @argument {string|number|Node} node node or ID
   */
  removeNode(node) {
    let id = isId(node) ? node : node.id
    node = this[nodes][id]
    // Delete node from index
    delete this[nodes][id]
    // Delete node from all the edges
    this[edges] = this[edges].filter(edge => (
      edge.source !== node && this.edge.target !== node
    ))
  }

  removeEdge(source, target) {
  }

  toJSON() {
    return {nodes: this[nodes], edges: this[edges]}
  }

}
