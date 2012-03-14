/*
  Dracula Graph Layout and Drawing Framework 0.2.0alpha
  (c) 2011 Philipp Strathausen <strathausen@gmail.com>, http://strathausen.eu
*/var Graph, log;
var __slice = Array.prototype.slice;
log = function() {
  var a;
  a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return typeof console !== "undefined" && console !== null ? console.log.apply(console, a) : void 0;
};
Graph = (function() {
  function Graph() {
    this.nodes = {};
    this.edges = {};
    this.snapshots = [];
    this.type = 'graph';
  }
  Graph.prototype.addNode = function(id, data) {
    var _base, _ref;
    return (_ref = (_base = this.nodes)[id]) != null ? _ref : _base[id] = new Graph.Node(id, data);
  };
  Graph.prototype.addEdge = function(source, target, data) {
    var edge, s, t;
    s = this.addNode(source);
    t = this.addNode(target);
    edge = new Graph.Edge;
    s.edges.push(edge);
    this.edges.push(edge);
    return t.edges.push(edge);
  };
  Graph.prototype.removeNode = function(id) {
    var i, _results;
    delete this.nodes[id];
    i = 0;
    _results = [];
    while (i < this.edges.length) {
      if (this.edges[i].source.id === id || this.edges[i].target.id === id) {
        this.edges.splice(i, 1);
        i--;
      }
      _results.push(i++);
    }
    return _results;
  };
  return Graph;
})();
Graph.Edge = (function() {
  function Edge(target, data) {
    this.data = data != null ? data : {
      directed: false
    };
  }
  return Edge;
})();
Graph.Renderer = (function() {
  function Renderer() {}
  return Renderer;
})();
Graph.Layout = (function() {
  function Layout() {}
  return Layout;
})();
Graph.Layout.Spring = (function() {
  function Spring(graph, ratio) {
    this.graph = graph;
    this.ratio = ratio;
    this.iterations = 500;
    this.maxRepulsiveForceDistance = 6;
    this.k = 2;
    this.c = 0.01;
    this.maxVertexMovement = 0.5;
    this.layout();
  }
  Spring.prototype.layout = function() {
    var i, _ref;
    this.layoutPrepare();
    for (i = 0, _ref = this.iterations; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      this.layoutIteration();
    }
    return this.layoutCalcBounds();
  };
  Spring.prototype.layoutPrepare = function() {
    var node, _i, _len, _ref, _results;
    _ref = this.graph.nodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      node.layoutPosX = 0;
      node.layoutPosY = 0;
      node.layoutForceX = 0;
      _results.push(node.layoutForceY = 0);
    }
    return _results;
  };
  Spring.prototype.layoutCalcBounds = function() {
    var maxx, maxy, minx, miny, node, x, y, _i, _len, _ref;
    minx = Infinity;
    maxx = -Infinity;
    miny = Infinity;
    maxy = -Infinity;
    _ref = this.graph.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      x = node.layoutPosX;
      y = node.layoutPosY;
      if (x > maxx) {
        maxx = x;
      }
      if (x < minx) {
        minx = x;
      }
      if (y > maxy) {
        maxy = y;
      }
      if (y < miny) {
        miny = y;
      }
    }
    this.graph.layoutMinX = minx;
    this.graph.layoutMaxX = maxx;
    this.graph.layoutMinY = miny;
    return this.graph.layoutMaxY = maxy;
  };
  Spring.prototype.layoutIteration = function() {
    var e, max, node, node1, node2, prev, xmove, ymove, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _results;
    prev = [];
    _ref = this.graph.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node1 = _ref[_i];
      for (_j = 0, _len2 = prev.length; _j < _len2; _j++) {
        node2 = prev[_j];
        this.layoutRepulsive(node1, node2);
      }
      prev.push(node1);
    }
    _ref2 = this.graph.edges;
    for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
      e = _ref2[_k];
      this.layoutAttractive(edge);
    }
    _ref3 = this.graph.nodes;
    _results = [];
    for (_l = 0, _len4 = _ref3.length; _l < _len4; _l++) {
      node = _ref3[_l];
      xmove = this.c * node.layoutForceX;
      ymove = this.c * node.layoutForceY;
      max = this.maxVertexMovement;
      if (xmove > max) {
        xmove = max;
      }
      if (xmove < -max) {
        xmove = -max;
      }
      if (ymove > max) {
        ymove = max;
      }
      if (ymove < -max) {
        ymove = -max;
      }
      node.layoutPosX += xmove;
      node.layoutPosY += ymove;
      node.layoutForceX = 0;
      _results.push(node.layoutForceY = 0);
    }
    return _results;
  };
  Spring.prototype.layoutRepulsive = function(node1, node2) {
    var d, d2, dx, dy, repulsiveForce;
    dx = node2.layoutPosX - node1.layoutPosX;
    dy = node2.layoutPosY - node1.layoutPosY;
    d2 = dx * dx + dy * dy;
    if (d2 < 0.01) {
      dx = 0.1 * Math.random() + 0.1;
      dy = 0.1 * Math.random() + 0.1;
      d2 = dx * dx + dy * dy;
    }
    d = Math.sqrt(d2);
    if (d < this.maxRepulsiveForceDistance) {
      repulsiveForce = this.k * this.k / d;
      node2.layoutForceX += repulsiveForce * dx / d;
      node2.layoutForceY += repulsiveForce * dy / d;
      node1.layoutForceX -= repulsiveForce * dx / d;
      return node1.layoutForceY -= repulsiveForce * dy / d;
    }
  };
  Spring.prototype.layoutAttractive = function(edge) {
    var attractiveForce, d, d2, dx, dy, node1, node2;
    node1 = edge.source;
    node2 = edge.target;
    dx = node2.layoutPosX - node1.layoutPosX;
    dy = node2.layoutPosY - node1.layoutPosY;
    d2 = dx * dx + dy * dy;
    if (d2 < 0.01) {
      dx = 0.1 * Math.random() + 0.1;
      dy = 0.1 * Math.random() + 0.1;
      d2 = dx * dx + dy * dy;
    }
    d = Math.sqrt(d2);
    if (d > this.maxRepulsiveForceDistance) {
      d = this.maxRepulsiveForceDistance;
      d2 = d * d;
    }
    attractiveForce = (d2 - this.k * this.k) / this.k;
    if (edge.attraction === void 0) {
      edge.attraction = 1;
    }
    attractiveForce *= Math.log(edge.attraction) * 0.5 + 1;
    node2.layoutForceX -= attractiveForce * dx / d;
    node2.layoutForceY -= attractiveForce * dy / d;
    node1.layoutForceX += attractiveForce * dx / d;
    return node1.layoutForceY += attractiveForce * dy / d;
  };
  return Spring;
})();
Graph.Layout.Ordered = function(graph, order) {
  this.graph = graph;
  this.order = order;
  return this.layout();
};
Graph.Layout.Ordered.prototype = {
  layout: function() {
    this.layoutPrepare();
    return this.layoutCalcBounds();
  },
  layoutPrepare: function(order) {
    var counter, i, node, _results;
    for (i in this.graph.nodes) {
      node = this.graph.nodes[i];
      node.layoutPosX = 0;
      node.layoutPosY = 0;
    }
    counter = 0;
    _results = [];
    for (i in this.order) {
      node = this.order[i];
      node.layoutPosX = counter;
      node.layoutPosY = Math.random();
      _results.push(counter++);
    }
    return _results;
  },
  layoutCalcBounds: function() {
    var i, maxx, maxy, minx, miny, x, y;
    minx = Infinity;
    maxx = -Infinity;
    miny = Infinity;
    maxy = -Infinity;
    for (i in this.graph.nodes) {
      x = this.graph.nodes[i].layoutPosX;
      y = this.graph.nodes[i].layoutPosY;
      if (x > maxx) {
        maxx = x;
      }
      if (x < minx) {
        minx = x;
      }
      if (y > maxy) {
        maxy = y;
      }
      if (y < miny) {
        miny = y;
      }
    }
    this.graph.layoutMinX = minx;
    this.graph.layoutMaxX = maxx;
    this.graph.layoutMinY = miny;
    return this.graph.layoutMaxY = maxy;
  }
};
Graph.Layout.OrderedTree = function(graph, order) {
  this.graph = graph;
  this.order = order;
  return this.layout();
};
Graph.Layout.OrderedTree.prototype = {
  layout: function() {
    this.layoutPrepare();
    return this.layoutCalcBounds();
  },
  layoutPrepare: function(order) {
    var counter, file, i, node, numNodes, rank, totalLevels, _results;
    for (i in this.graph.nodes) {
      node = this.graph.nodes[i];
      node.layoutPosX = 0;
      node.layoutPosY = 0;
    }
    numNodes = this.order.length;
    totalLevels = Math.floor(Math.log(numNodes) / Math.log(2));
    counter = 1;
    _results = [];
    for (i in this.order) {
      node = this.order[i];
      rank = Math.floor(Math.log(counter) / Math.log(2));
      file = counter - Math.pow(rank, 2);
      log("Node " + node.id + "  #" + counter + " is at rank " + rank + " file " + file);
      node.layoutPosX = totalLevels - rank;
      node.layoutPosY = file;
      _results.push(counter++);
    }
    return _results;
  },
  layoutCalcBounds: function() {
    var i, maxx, maxy, minx, miny, x, y;
    minx = Infinity;
    maxx = -Infinity;
    miny = Infinity;
    maxy = -Infinity;
    for (i in this.graph.nodes) {
      x = this.graph.nodes[i].layoutPosX;
      y = this.graph.nodes[i].layoutPosY;
      if (x > maxx) {
        maxx = x;
      }
      if (x < minx) {
        minx = x;
      }
      if (y > maxy) {
        maxy = y;
      }
      if (y < miny) {
        miny = y;
      }
    }
    this.graph.layoutMinX = minx;
    this.graph.layoutMaxX = maxx;
    this.graph.layoutMinY = miny;
    return this.graph.layoutMaxY = maxy;
  }
};
Graph.Layout.TournamentTree = function(graph, order) {
  this.graph = graph;
  this.order = order;
  return this.layout();
};
Graph.Layout.TournamentTree.prototype = {
  layout: function() {
    this.layoutPrepare();
    return this.layoutCalcBounds();
  },
  layoutPrepare: function(order) {
    var counter, depth, final_x, i, node, numNodes, offset, totalLevels, xpos, _results;
    for (i in this.graph.nodes) {
      node = this.graph.nodes[i];
      node.layoutPosX = 0;
      node.layoutPosY = 0;
    }
    numNodes = this.order.length;
    totalLevels = Math.floor(Math.log(numNodes) / Math.log(2));
    counter = 1;
    _results = [];
    for (i in this.order) {
      node = this.order[i];
      depth = Math.floor(Math.log(counter) / Math.log(2));
      xpos = counter - Math.pow(depth, 2);
      offset = Math.pow(2, totalLevels - depth);
      final_x = offset + (counter - Math.pow(2, depth)) * Math.pow(2, (totalLevels - depth) + 1);
      log("Node " + node.id + "  #" + counter + " is at depth " + depth + " offset " + offset + " final_x " + final_x);
      node.layoutPosX = final_x;
      node.layoutPosY = depth;
      _results.push(counter++);
    }
    return _results;
  },
  layoutCalcBounds: function() {
    var i, maxx, maxy, minx, miny, x, y;
    minx = Infinity;
    maxx = -Infinity;
    miny = Infinity;
    maxy = -Infinity;
    for (i in this.graph.nodes) {
      x = this.graph.nodes[i].layoutPosX;
      y = this.graph.nodes[i].layoutPosY;
      if (x > maxx) {
        maxx = x;
      }
      if (x < minx) {
        minx = x;
      }
      if (y > maxy) {
        maxy = y;
      }
      if (y < miny) {
        miny = y;
      }
    }
    this.graph.layoutMinX = minx;
    this.graph.layoutMaxX = maxx;
    this.graph.layoutMinY = miny;
    return this.graph.layoutMaxY = maxy;
  }
};
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fun) {
    var i, len, thisp, _results;
    len = this.length;
    thisp = arguments[1];
    i = 0;
    _results = [];
    while (i < len) {
      if (i in this) {
        fun.call(thisp, this[i], i, this);
      }
      _results.push(i++);
    }
    return _results;
  };
}