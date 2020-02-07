import ImportedRaphael from 'raphael'
import Renderer from './renderer'

// Is not bundled for the standalone browser version (e.g. for CDN)
const Raphael = typeof window !== 'undefined' && window.Raphael || ImportedRaphael

const dragify = (shape) => {
  const r = shape.paper
  shape.items.forEach((item) => {
    item.set = shape;
    if (item.type === 'text') {
      return
    }
    item.node.style.cursor = 'move';
    item.drag(
      function dragMove(dx, dy, x, y) {
        dx = this.set.ox;
        dy = this.set.oy;
        const bBox = this.set.getBBox();
        const newX = x - dx + (bBox.x + bBox.width / 2);
        const newY = y - dy + (bBox.y + bBox.height / 2);
        const clientX =
            x - (newX < 20 ? newX - 20 : newX > r.width - 20 ? newX - r.width + 20 : 0);
        const clientY =
            y - (newY < 20 ? newY - 20 : newY > r.height - 20 ? newY - r.height + 20 : 0);
        this.set.translate(clientX - Math.round(dx), clientY - Math.round(dy));
        shape.connections.forEach((connection) => {
          connection.draw()
        })

        this.set.ox = clientX;
        this.set.oy = clientY;
      },
      function dragEnter(x, y) {
        this.set.ox = x;
        this.set.oy = y;
        this.animate({ 'fill-opacity': 0.2 }, 500);
      },
      function dragOut() {
        this.animate({ 'fill-opacity': 0.0 }, 500);
      })
  })
}

export default class RaphaelRenderer extends Renderer {
  constructor(element, graph, width, height) {
    super(element, graph, width, height)
    this.canvas = Raphael(this.element, this.width, this.height)
    this.lineStyle = {
      stroke: '#443399',
      'stroke-width': '2px',
    }
  }

  drawNode(node) {
    const color = Raphael.getColor()
    // TODO update / cache shape
    // if (node.shape) {
    //   node.shape.translate(node.point[0], node.point[1])
    //   return
    // }
    if (node.render) {
      node.shape = node.render(this.canvas, node)
    } else {
      node.shape = this.canvas.set()
      node.shape
        .push(this.canvas.ellipse(0, 0, 30, 20)
          .attr({ stroke: color, 'stroke-width': 2, fill: color, 'fill-opacity': 0 }))
        .push(this.canvas.text(0, 30, node.label || node.id))
    }
    node.shape.translate(node.point[0], node.point[1])
    node.shape.connections = []
    dragify(node.shape)
  }

  drawEdge(edge) {
    if (!edge.shape) {
      edge.shape = this.canvas.connection(edge.source.shape, edge.target.shape, edge.style)
      // edge.shape.line.attr(this.lineStyle)
      edge.source.shape.connections.push(edge.shape)
      edge.target.shape.connections.push(edge.shape)
    }
  }
}

// <Raphael.fn.connection>

/* coordinates for potential connection coordinates from/to the objects */
const getConnectionPoints = (obj1, obj2) => {
  /* get bounding boxes of target and source */
  const bb1 = obj1.getBBox()
  const bb2 = obj2.getBBox()

  const off1 = 0
  const off2 = 0

  return [

    /* NORTH 1 */
    { x: bb1.x + bb1.width / 2, y: bb1.y - off1 },

    /* SOUTH 1 */
    { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + off1 },

    /* WEST  1 */
    { x: bb1.x - off1, y: bb1.y + bb1.height / 2 },

    /* EAST  1 */
    { x: bb1.x + bb1.width + off1, y: bb1.y + bb1.height / 2 },

    /* NORTH 2 */
    { x: bb2.x + bb2.width / 2, y: bb2.y - off2 },

    /* SOUTH 2 */
    { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + off2 },

    /* WEST  2 */
    { x: bb2.x - off2, y: bb2.y + bb2.height / 2 },

    /* EAST  2 */
    { x: bb2.x + bb2.width + off2, y: bb2.y + bb2.height / 2 },

  ]
}

Raphael.fn.connection = function Connection(obj1, obj2, style) {
  const self = this

  /* create and return new connection */
  const edge = {

    /* eslint-disable complexity */
    draw() {
      const p = getConnectionPoints(obj1, obj2)

      /* distances between objects and according coordinates connection */
      const d = {}
      const dis = []
      let dx
      let dy

      /*
       * find out the best connection coordinates by trying all possible ways
       */
      /* loop the first object's connection coordinates */
      for (let i = 0; i < 4; i++) {
        /* loop the second object's connection coordinates */
        for (let j = 4; j < 8; j++) {
          dx = Math.abs(p[i].x - p[j].x)
          dy = Math.abs(p[i].y - p[j].y)
          if ((i === j - 4) || (((i !== 3 && j !== 6) || p[i].x < p[j].x) &&
            ((i !== 2 && j !== 7) || p[i].x > p[j].x) &&
            ((i !== 0 && j !== 5) || p[i].y > p[j].y) &&
            ((i !== 1 && j !== 4) || p[i].y < p[j].y))
          ) {
            dis.push(dx + dy)
            d[dis[dis.length - 1].toFixed(3)] = [i, j]
          }
        }
      }
      const res = dis.length === 0 ? [0, 4] : d[Math.min(...dis).toFixed(3)]

      /* bezier path */
      const x1 = p[res[0]].x
      const y1 = p[res[0]].y
      const x4 = p[res[1]].x
      const y4 = p[res[1]].y
      dx = Math.max(Math.abs(x1 - x4) / 2, 10)
      dy = Math.max(Math.abs(y1 - y4) / 2, 10)
      const x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3)
      const y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3)
      const x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3)
      const y3 = [0, 0, 0, 0, y4 - dy, y4 + dy, y4, y4][res[1]].toFixed(3)

      /* assemble path and arrow */
      let path = [
        `M${x1.toFixed(3)}`, y1.toFixed(3), `C${x2}`, y2, x3, y3,
        x4.toFixed(3), y4.toFixed(3),
      ].join(',')

      /* arrow */
      if (style && style.directed) {
        // magnitude, length of the last path vector
        const mag = Math.sqrt((y4 - y3) * (y4 - y3) + (x4 - x3) * (x4 - x3));
        // vector normalisation to specified length
        const norm = (x, l) => -x * (l || 5) / mag
        // calculate array coordinates (two lines orthogonal to the path vector)
        const arc = [{
          x: (norm(x4 - x3) + norm(y4 - y3) + x4).toFixed(3),
          y: (norm(y4 - y3) + norm(x4 - x3) + y4).toFixed(3),
        }, {
          x: (norm(x4 - x3) - norm(y4 - y3) + x4).toFixed(3),
          y: (norm(y4 - y3) - norm(x4 - x3) + y4).toFixed(3),
        }]
        path = `${path},M${arc[0].x},${arc[0].y},L${x4},${y4},L${arc[1].x},${arc[1].y}`
      }

      /* function to be used for moving existent path(s), e.g. animate() or attr() */
      const move = 'attr'

      /* applying path(s) */
      if (edge.fg) {
        edge.fg[move]({ path })
      } else {
        edge.fg = self.path(path)
          .attr({ stroke: style && style.stroke || '#000', fill: 'none' })
          .toBack()
      }
      if (edge.bg) {
        edge.bg[move]({ path })
      } else if (style && style.fill && style.fill.split) {
        edge.bg = self.path(path).attr({
          stroke: style.fill.split('|')[0],
          fill: 'none',
          'stroke-width': style.fill.split('|')[1] || 3,
        }).toBack()
      }

      /* setting label */
      if (style && style.label) {
        if (edge.label) {
          edge.label.attr({ x: (x1 + x4) / 2, y: (y1 + y4) / 2 })
        } else {
          edge.label = self.text((x1 + x4) / 2, (y1 + y4) / 2, style.label)
            .attr({
              fill: '#000',
              'font-size': style['font-size'] || '10px',
              'fill-opacity': '0.6',
            });
        }
      }

      if (style && style.label && style['label-style'] && edge.label) {
        edge.label.attr(style['label-style'])
      }

      if (style && style.callback) {
        style.callback(edge)
      }
    },
  }
  edge.draw()
  return edge
}

// </Raphael.fn.connection>
