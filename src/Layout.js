import {each} from 'lodash/collection'

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
    each(this.graph.nodes, node => {
      node.layoutPosX = 0
      node.layoutPosY = 0
    })
  }

  layoutPrepare() {
    throw new Error('not implemented')
  }

  layoutCalcBounds() {
    let minx = Infinity
    let maxx = -Infinity
    let miny = Infinity
    let maxy = -Infinity

    each(this.graph.nodes, node => {
      let x = node.layoutPosX
      let y = node.layoutPosY

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

  transformCoords(x, y, h, w) {
    // TODO for drawing, the coordinates need to be transformed
  }

}
