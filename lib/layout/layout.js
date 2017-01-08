'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('lodash/collection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for distributing nodes algorithms
 */
var Layout = function () {
  function Layout(graph) {
    _classCallCheck(this, Layout);

    this.graph = graph;
  }

  _createClass(Layout, [{
    key: 'layout',
    value: function layout() {
      this.initCoords();
      this.layoutPrepare();
      this.layoutCalcBounds();
    }
  }, {
    key: 'initCoords',
    value: function initCoords() {
      (0, _collection.each)(this.graph.nodes, function (node) {
        node.layoutPosX = 0;
        node.layoutPosY = 0;
      });
    }
  }, {
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      // eslint-disable-line
      throw new Error('not implemented');
    }
  }, {
    key: 'layoutCalcBounds',
    value: function layoutCalcBounds() {
      var minx = Infinity;
      var maxx = -Infinity;
      var miny = Infinity;
      var maxy = -Infinity;

      (0, _collection.each)(this.graph.nodes, function (node) {
        var x = node.layoutPosX;
        var y = node.layoutPosY;

        if (x > maxx) maxx = x;
        if (x < minx) minx = x;
        if (y > maxy) maxy = y;
        if (y < miny) miny = y;
      });

      this.graph.layoutMinX = minx;
      this.graph.layoutMaxX = maxx;
      this.graph.layoutMinY = miny;
      this.graph.layoutMaxY = maxy;
    }
  }]);

  return Layout;
}();

exports.default = Layout;