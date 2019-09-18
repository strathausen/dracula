import { each } from 'lodash/collection'
import Layout from './layout'

/**
 * TODO take ratio into account
 * TODO use integers for speed
 */
export default class Spring extends Layout {
  constructor(graph) {
    super(graph)
    this.iterations = 500
    this.maxRepulsiveForceDistance = 6
    this.k = 2
    this.c = 0.01
    this.maxVertexMovement = 0.5
    this.layout()
  }

  static create(...args) {
    return new this(...args)
  }

  layout() {
    this.layoutPrepare()
    for (let i = 0; i < this.iterations; i++) {
      this.layoutIteration()
    }
    this.layoutCalcBounds()
  }

  layoutPrepare() {
    each(this.graph.nodes, (node) => {
      node.layoutPosX = 0
      node.layoutPosY = 0
      node.layoutForceX = 0
      node.layoutForceY = 0
    })
  }

  layoutIteration() {
    // Forces on nodes due to node-node repulsions
    const prev = []
    each(this.graph.nodes, (node1) => {
      prev.forEach((node2) => {
        this.layoutRepulsive(node1, node2)
      })
      prev.push(node1)
    })

    // Forces on nodes due to edge attractions
    this.graph.edges.forEach((edge) => {
      this.layoutAttractive(edge)
    })

    // Move by the given force
    each(this.graph.nodes, (node) => {
      let xmove = this.c * node.layoutForceX
      let ymove = this.c * node.layoutForceY

      const max = this.maxVertexMovement

      if (xmove > max) xmove = max
      if (xmove < -max) xmove = -max
      if (ymove > max) ymove = max
      if (ymove < -max) ymove = -max

      node.layoutPosX += xmove
      node.layoutPosY += ymove
      node.layoutForceX = 0
      node.layoutForceY = 0
    })
  }

  layoutRepulsive(node1, node2) {
    if (!node1 || !node2) {
      return
    }
    let dx = node2.layoutPosX - node1.layoutPosX
    let dy = node2.layoutPosY - node1.layoutPosY
    let d2 = dx * dx + dy * dy
    if (d2 < 0.01) {
      dx = 0.1 * Math.random() + 0.1
      dy = 0.1 * Math.random() + 0.1
      d2 = dx * dx + dy * dy
    }
    const d = Math.sqrt(d2)
    if (d < this.maxRepulsiveForceDistance) {
      const repulsiveForce = this.k * this.k / d
      node2.layoutForceX += repulsiveForce * dx / d
      node2.layoutForceY += repulsiveForce * dy / d
      node1.layoutForceX -= repulsiveForce * dx / d
      node1.layoutForceY -= repulsiveForce * dy / d
    }
  }

  layoutAttractive(edge) {
    const node1 = edge.source
    const node2 = edge.target

    let dx = node2.layoutPosX - node1.layoutPosX
    let dy = node2.layoutPosY - node1.layoutPosY
    let d2 = dx * dx + dy * dy
    if (d2 < 0.01) {
      dx = 0.1 * Math.random() + 0.1
      dy = 0.1 * Math.random() + 0.1
      d2 = dx * dx + dy * dy
    }
    let d = Math.sqrt(d2)
    if (d > this.maxRepulsiveForceDistance) {
      d = this.maxRepulsiveForceDistance
      d2 = d * d
    }
    let attractiveForce = (d2 - this.k * this.k) / this.k
    if (!edge.attraction) edge.attraction = 1
    attractiveForce *= Math.log(edge.attraction) * 0.5 + 1

    node2.layoutForceX -= attractiveForce * dx / d
    node2.layoutForceY -= attractiveForce * dy / d
    node1.layoutForceX += attractiveForce * dx / d
    node1.layoutForceY += attractiveForce * dy / d
  }
}
