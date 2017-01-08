'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _spring = require('./spring');

var _spring2 = _interopRequireDefault(_spring);

var _dracula = require('../dracula');

var _dracula2 = _interopRequireDefault(_dracula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Spring Layout', function () {
  var graph = void 0;

  it('should not crash', function () {
    graph = _dracula2.default.create();
    graph.addEdge('a', 'b');
    _spring2.default.create(graph);
  });

  it('have a distance between the nodes', function () {
    var _graph$nodes = graph.nodes,
        a = _graph$nodes.a,
        b = _graph$nodes.b;

    var diffX = Math.abs(a.layoutPosX - b.layoutPosX);
    var diffY = Math.abs(a.layoutPosY - b.layoutPosY);
    (0, _assert2.default)(diffX > 0);
    (0, _assert2.default)(diffY > 0);
  });

  it('has layout props', function () {
    (0, _assert2.default)(graph.layoutMinX, 'no min x');
    (0, _assert2.default)(graph.layoutMinY, 'no min y');
    (0, _assert2.default)(graph.layoutMaxX, 'no max x');
    (0, _assert2.default)(graph.layoutMaxY, 'no max y');
  });
});