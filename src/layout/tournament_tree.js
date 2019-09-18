import { each } from 'lodash/collection'
import Layout from './layout'

export default class TournamentTree extends Layout {
  /**
   * @param {Graph} graph
   * @param {Array[Node]} order
   */
  constructor(graph, order) {
    super()
    this.graph = graph
    this.order = order
    this.layout()
  }

  layout() {
    this.layoutPrepare()
    this.layoutCalcBounds()
  }

  layoutPrepare() {
    each(this.graph.nodes, (node) => {
      node.layoutPosX = 0
      node.layoutPosY = 0
    })

    // To reverse the order of rendering, we need to find out the
    // absolute number of levels we have. simple log math applies.
    const numNodes = this.order.length
    const totalLevels = Math.floor(Math.log(numNodes) / Math.log(2))

    let counter = 1
    this.order.forEach((node) => {
      const depth = Math.floor(Math.log(counter) / Math.log(2))
      const offset = Math.pow(2, totalLevels - depth)
      const finalX = offset + (counter - Math.pow(2, depth)) *
        Math.pow(2, (totalLevels - depth) + 1)
      node.layoutPosX = finalX
      node.layoutPosY = depth
      counter++;
    })
  }
}
