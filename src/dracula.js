import uuid from 'uuid'

// Testing for string or number data type
const isId = x => !!~['string', 'number'].indexOf(typeof x)

/**
 * Graph Data Structure
 */
export default class Dracula {
  constructor() {
    this.nodes = {}
    this.edges = []
  }

  /**
   * `create` for the `new` haters :)
   *
   * @returns {Dracula} a new graph instance
   */
  static create() {
    return new Dracula()
  }

  /**
   * Add node if it doesn't exist yet.
   *
   * This method does not update an existing node.
   * If you want to update a node, just update the node object.
   *
   * @param {string|number|object} id or node data
   * @param {object|} nodeData (optional)
   * @returns {Node} the new or existing node
   */
  addNode(id, nodeData) {
    // Node initialisation shorthands
    if (!nodeData) {
      nodeData = isId(id) ? { id } : id
    } else {
      nodeData.id = id
    }
    if (!nodeData.id) {
      nodeData.id = uuid()
    // Don't create a new node if it already exists
    } else if (this.nodes[nodeData.id]) {
      return this.nodes[nodeData.id]
    }
    nodeData.edges = []
    this.nodes[nodeData.id] = nodeData
    return nodeData
  }

  /**
   * @param {string|number|object} source node or ID
   * @param {string|number|object} target node or ID
   * @param {object|} (optional) edge data, e.g. styles
   * @returns {Edge}
   */
  addEdge(sourceNode, targetNode, opts = {}) {
    const source = this.addNode(sourceNode)
    const target = this.addNode(targetNode)
    const style = opts.style || opts
    const edge = { style, source, target }
    this.edges.push(edge)
    source.edges.push(edge)
    target.edges.push(edge)
    return edge
  }

  /**
   * @param {string|number|Node} node node or ID
   * @return {Node}
   */
  removeNode(node) {
    const id = isId(node) ? node : node.id
    node = this.nodes[id]
    // Delete node from index
    delete this.nodes[id]
    // Delete node from all the edges
    this.edges.forEach((edge) => {
      if (edge.source === node || edge.target === node) {
        this.removeEdge(edge)
      }
    })
    return node
  }

  /**
   * Remove an edge by providing either two nodes (or ids) or the edge instance
   * @param {string|number|Node|Edge} node edge, node or ID
   * @param {string|number|Node} node node or ID
   * @return {Edge}
   */
  removeEdge(source, target) {
    let found
    // Fallback to only one parameter
    if (!target) {
      target = source.target
      source = source.source
    }
    // Normalise node IDs
    if (isId(source)) source = { id: source }
    if (isId(target)) target = { id: target }
    // Find and remove edge
    this.edges = this.edges.filter((edge) => {
      if (edge.source.id === source.id && edge.target.id === target.id) {
        found = edge
        return false
      }
      return true
    })
    if (found) {
      found.source.edges = found.source.edges.filter(edge => edge !== found)
      found.target.edges = found.target.edges.filter(edge => edge !== found)
    }
    // Return removed edge
    return found
  }

  toJSON() {
    return { nodes: this.nodes, edges: this.edges }
  }
}
