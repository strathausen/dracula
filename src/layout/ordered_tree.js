import Layout from './layout'

/**
 * OrderedTree is like Ordered but assumes there is one root
 * This way we can give non random positions to nodes on the Y-axis
 * It assumes the ordered nodes are of a perfect binary tree
 */
export default class OrderedTree extends Layout {
  constructor(graph, order) {
    super(graph)
    this.order = order
    this.layout()
  }

  layoutPrepare() {
    // To reverse the order of rendering, we need to find out the
    // absolute number of levels we have. simple log math applies.
    const numNodes = this.order.length
    const totalLevels = Math.floor(Math.log(numNodes) / Math.log(2))

    let counter = 1
    this.order.forEach((node) => {
      // Rank aka x coordinate
      const rank = Math.floor(Math.log(counter) / Math.log(2))
      // File relative to top
      const file = counter - Math.pow(rank, 2)

      node.layoutPosX = totalLevels - rank
      node.layoutPosY = file
      counter++;
    })
  }
}
