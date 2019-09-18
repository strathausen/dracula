import { each } from 'lodash/collection'

/**
 * Base class for distributing nodes algorithms
 */
export default class Layout {
  constructor(graph) {
    this.graph = graph
  }

  layout() {
    this.initCoords()
    this.layoutPrepare()
    this.layoutCalcBounds()
  }

  initCoords() {
    each(this.graph.nodes, (node) => {
      node.layoutPosX = 0
      node.layoutPosY = 0
    })
  }

  layoutPrepare() { // eslint-disable-line
    throw new Error('not implemented')
  }

  layoutCalcBounds() {
    let minx = Infinity
    let maxx = -Infinity
    let miny = Infinity
    let maxy = -Infinity

    each(this.graph.nodes, (node) => {
      const x = node.layoutPosX
      const y = node.layoutPosY

      if (x > maxx) maxx = x
      if (x < minx) minx = x
      if (y > maxy) maxy = y
      if (y < miny) miny = y
    })

    this.graph.layoutMinX = minx
    this.graph.layoutMaxX = maxx
    this.graph.layoutMinY = miny
    this.graph.layoutMaxY = maxy
  }
}
