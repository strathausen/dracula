'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('lodash/collection');

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO take ratio into account
 * TODO use integers for speed
 */
var Spring = function (_Layout) {
  _inherits(Spring, _Layout);

  function Spring(graph) {
    _classCallCheck(this, Spring);

    var _this = _possibleConstructorReturn(this, (Spring.__proto__ || Object.getPrototypeOf(Spring)).call(this, graph));

    _this.iterations = 500;
    _this.maxRepulsiveForceDistance = 6;
    _this.k = 2;
    _this.c = 0.01;
    _this.maxVertexMovement = 0.5;
    _this.layout();
    return _this;
  }

  _createClass(Spring, [{
    key: 'layout',
    value: function layout() {
      this.layoutPrepare();
      for (var i = 0; i < this.iterations; i++) {
        this.layoutIteration();
      }
      this.layoutCalcBounds();
    }
  }, {
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      (0, _collection.each)(this.graph.nodes, function (node) {
        node.layoutPosX = 0;
        node.layoutPosY = 0;
        node.layoutForceX = 0;
        node.layoutForceY = 0;
      });
    }
  }, {
    key: 'layoutIteration',
    value: function layoutIteration() {
      var _this2 = this;

      // Forces on nodes due to node-node repulsions
      var prev = [];
      (0, _collection.each)(this.graph.nodes, function (node1) {
        prev.forEach(function (node2) {
          _this2.layoutRepulsive(node1, node2);
        });
        prev.push(node1);
      });

      // Forces on nodes due to edge attractions
      this.graph.edges.forEach(function (edge) {
        _this2.layoutAttractive(edge);
      });

      // Move by the given force
      (0, _collection.each)(this.graph.nodes, function (node) {
        var xmove = _this2.c * node.layoutForceX;
        var ymove = _this2.c * node.layoutForceY;

        var max = _this2.maxVertexMovement;

        if (xmove > max) xmove = max;
        if (xmove < -max) xmove = -max;
        if (ymove > max) ymove = max;
        if (ymove < -max) ymove = -max;

        node.layoutPosX += xmove;
        node.layoutPosY += ymove;
        node.layoutForceX = 0;
        node.layoutForceY = 0;
      });
    }
  }, {
    key: 'layoutRepulsive',
    value: function layoutRepulsive(node1, node2) {
      if (!node1 || !node2) {
        return;
      }
      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = 0.1 * Math.random() + 0.1;
        dy = 0.1 * Math.random() + 0.1;
        d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if (d < this.maxRepulsiveForceDistance) {
        var repulsiveForce = this.k * this.k / d;
        node2.layoutForceX += repulsiveForce * dx / d;
        node2.layoutForceY += repulsiveForce * dy / d;
        node1.layoutForceX -= repulsiveForce * dx / d;
        node1.layoutForceY -= repulsiveForce * dy / d;
      }
    }
  }, {
    key: 'layoutAttractive',
    value: function layoutAttractive(edge) {
      var node1 = edge.source;
      var node2 = edge.target;

      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = 0.1 * Math.random() + 0.1;
        dy = 0.1 * Math.random() + 0.1;
        d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if (d > this.maxRepulsiveForceDistance) {
        d = this.maxRepulsiveForceDistance;
        d2 = d * d;
      }
      var attractiveForce = (d2 - this.k * this.k) / this.k;
      if (!edge.attraction) edge.attraction = 1;
      attractiveForce *= Math.log(edge.attraction) * 0.5 + 1;

      node2.layoutForceX -= attractiveForce * dx / d;
      node2.layoutForceY -= attractiveForce * dy / d;
      node1.layoutForceX += attractiveForce * dx / d;
      node1.layoutForceY += attractiveForce * dy / d;
    }
  }], [{
    key: 'create',
    value: function create() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(this, [null].concat(args)))();
    }
  }]);

  return Spring;
}(_layout2.default);

exports.default = Spring;