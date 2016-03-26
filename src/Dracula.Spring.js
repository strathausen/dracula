/**
 * TODO take ratio into account
 * TODO use integers
 * TODO have a max distancec and/or inverse proportional repulsion
 */
export default class Spring {

  constructor(graph) {
    this.graph = graph
    this.iterations = 500
    this.maxRepulsiveForceDistance = 6
    this.k = 2
    this.c = 0.01
    this.maxVertexMovement = 0.5
    this.positions = {}
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
    this.graph.nodes.forEach(node => {
      this.positions[node.id].layoutPosX = 0
      this.positions[node.id].layoutPosY = 0
      this.positions[node.id].layoutForceX = 0
      this.positions[node.id].layoutForceY = 0
    })
  }

  layoutIteration() {
    // Forces on nodes due to node-node repulsions
    let prev = []
    this.graph.nodes.forEach(node1 => {
      prev.forEach(node2 => {
        this.layoutRepulsive(node1, node2)
      })
      prev.push(node2)
    })

    // Forces on nodes due to edge attractions
    this.graph.edges.forEach(edge => {
      this.layoutAttractive(edge)
    })

    // Move by the given force
    this.graph.nodes.forEach(node => {
      let xmove = this.c * this.positions[node.id].layoutForceX
      let ymove = this.c * this.positions[node.id].layoutForceY

      let max = this.maxVertexMovement

      if (xmove > max) xmove = max
      if (xmove < -max) xmove = -max
      if (ymove > max) ymove = max
      if (ymove < -max) ymove = -max

      this.positions[node.id].layoutPosX += xmove
      this.positions[node.id].layoutPosY += ymove
      this.positions[node.id].layoutForceX = 0
      this.positions[node.id].layoutForceY = 0
    })
  }

  layoutRepulsive(node1, node2) {
    if (typeof node1 == 'undefined' || typeof node2 == 'undefined')
      return
    let dx = this.positions[node2.id].layoutPosX - this.positions[node1.id].layoutPosX
    let dy = this.positions[node2.id].layoutPosY - this.positions[node1.id].layoutPosY
    let d2 = dx * dx + dy * dy
    if (d2 < 0.01) {
      dx = 0.1 * Math.random() + 0.1
      dy = 0.1 * Math.random() + 0.1
      d2 = dx * dx + dy * dy
    }
    let d = Math.sqrt(d2)
    if (d < this.maxRepulsiveForceDistance) {
      let repulsiveForce = this.k * this.k / d
      this.positions[node2.id].layoutForceX += repulsiveForce * dx / d
      this.positions[node2.id].layoutForceY += repulsiveForce * dy / d
      this.positions[node1.id].layoutForceX -= repulsiveForce * dx / d
      this.positions[node1.id].layoutForceY -= repulsiveForce * dy / d
    }
  }

  layoutAttractive(edge) {
    let node1 = edge.source
    let node2 = edge.target

    let dx = this.positions[node2.id].layoutPosX - this.positions[node1.id].layoutPosX
    let dy = this.positions[node2.id].layoutPosY - this.positions[node1.id].layoutPosY
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
    if (edge.attraction === undefined) edge.attraction = 1
    attractiveForce *= Math.log(edge.attraction) * 0.5 + 1

    this.positions[node2.id].layoutForceX -= attractiveForce * dx / d
    this.positions[node2.id].layoutForceY -= attractiveForce * dy / d
    this.positions[node1.id].layoutForceX += attractiveForce * dx / d
    this.positions[node1.id].layoutForceY += attractiveForce * dy / d
  }

  layoutCalcBounds() {
    let minx = Infinity
    let maxx = -Infinity
    let miny = Infinity
    let maxy = -Infinity

    this.graph.nodes.forEach(node => {
      let x = this.positions[node.id].layoutPosX
      let y = this.positions[node.id].layoutPosY

      if (x > maxx) maxx = x
      if (x < minx) minx = x
      if (y > maxy) maxy = y
      if (y < miny) miny = y
    })

    this.layoutMinX = minx
    this.layoutMaxX = maxx
    this.layoutMinY = miny
    this.layoutMaxY = maxy
  }

  transformCoords() {
  }

}
