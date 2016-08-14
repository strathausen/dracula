import Layout from './layout'
import {each} from 'lodash/collection'

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
    each(this.graph.nodes, node => {
      node.layoutPosX = 0
      node.layoutPosY = 0
    })

    // To reverse the order of rendering, we need to find out the
    // absolute number of levels we have. simple log math applies.
    let numNodes = this.order.length
    let totalLevels = Math.floor(Math.log(numNodes) / Math.log(2))

    let counter = 1
    this.order.forEach(node => {
      let depth = Math.floor(Math.log(counter) / Math.log(2))
      let offset = Math.pow(2, totalLevels - depth)
      let final_x = offset + (counter - Math.pow(2, depth)) *
        Math.pow(2, (totalLevels - depth) + 1)
      node.layoutPosX = final_x
      node.layoutPosY = depth
      counter++;
    })
  }

}
