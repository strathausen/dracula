'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OrderedTree is like Ordered but assumes there is one root
 * This way we can give non random positions to nodes on the Y-axis
 * It assumes the ordered nodes are of a perfect binary tree
 */
var OrderedTree = function (_Layout) {
  _inherits(OrderedTree, _Layout);

  function OrderedTree(graph, order) {
    _classCallCheck(this, OrderedTree);

    var _this = _possibleConstructorReturn(this, (OrderedTree.__proto__ || Object.getPrototypeOf(OrderedTree)).call(this, graph));

    _this.order = order;
    _this.layout();
    return _this;
  }

  _createClass(OrderedTree, [{
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      // To reverse the order of rendering, we need to find out the
      // absolute number of levels we have. simple log math applies.
      var numNodes = this.order.length;
      var totalLevels = Math.floor(Math.log(numNodes) / Math.log(2));

      var counter = 1;
      this.order.forEach(function (node) {
        // Rank aka x coordinate
        var rank = Math.floor(Math.log(counter) / Math.log(2));
        // File relative to top
        var file = counter - Math.pow(rank, 2);

        node.layoutPosX = totalLevels - rank;
        node.layoutPosY = file;
        counter++;
      });
    }
  }]);

  return OrderedTree;
}(_layout2.default);

exports.default = OrderedTree;