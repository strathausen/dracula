'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _dracula = require('./dracula');

var _dracula2 = _interopRequireDefault(_dracula);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Dracula', function () {

  describe('#constructor', function () {

    it('exposes nodes and edges', function () {
      var graph = _dracula2.default.create();
      _assert2.default.equal(Object.keys(graph).length, 2);
    });
  });

  describe('#addNode', function () {

    it('via string ID', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode('bar');
      _assert2.default.deepEqual(node, { id: 'bar' });
    });

    it('via number ID', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23);
      _assert2.default.deepEqual(node, { id: 23 });
    });

    it('via object with id', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode({ id: 23 });
      _assert2.default.deepEqual(node, { id: 23 });
    });

    it('via object without id', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode({ foo: 'bar' });
      _assert2.default.deepEqual(_typeof(node.id), 'string');
    });

    it('via id and object', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23, { foo: 'bar' });
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23' });
    });

    it('do not replace existing nodes', function () {
      var graph = _dracula2.default.create();
      var n1 = graph.addNode('a');
      var n2 = graph.addNode('a');
      _assert2.default.strictEqual(n1, n2);
    });
  });

  describe('#removeNode', function () {

    it('via id', function () {
      var graph = _dracula2.default.create();
      graph.addNode(23, { foo: 'bar' });
      var node = graph.removeNode(23);
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23' });
      _assert2.default.equal(Object.keys(graph.toJSON().nodes).length, 0);
    });

    it('via node instance', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23, { foo: 'bar' });
      var deleted = graph.removeNode(node);
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23' });
      _assert2.default.deepEqual(deleted, { foo: 'bar', id: '23' });
      _assert2.default.equal(Object.keys(graph.toJSON().nodes).length, 0);
    });
  });

  describe('#addEdge', function () {

    it('create edge', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });

    it('create edge with data', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b', { style: 'fancy' });
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' }, style: 'fancy' });
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });
  });

  describe('#removeEdge', function () {

    it('remove by providing two node ids', function () {
      var graph = _dracula2.default.create();
      graph.addEdge('a', 'b');
      var edge = graph.removeEdge('a', 'b');
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove by providing two nodes', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      var removed = graph.removeEdge({ id: 'a' }, { id: 'b' });
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.deepEqual(removed, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove by providing edge', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      var removed = graph.removeEdge(edge);
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.deepEqual(removed, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove something else', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      var removed = graph.removeEdge('b', 'c');
      _assert2.default.deepEqual(edge, { source: { id: 'a' }, target: { id: 'b' } });
      _assert2.default.deepEqual(removed, undefined);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });
  });

  describe('#toJSON', function () {

    it('represent graph structure', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23);
      var edge = graph.addEdge(23, 'c');
      _assert2.default.deepEqual(node, { id: 23 });
      _assert2.default.deepEqual(edge, { source: { id: 23 }, target: { id: 'c' } });
      _assert2.default.deepEqual(graph.toJSON(), {
        edges: [{ source: { id: 23 }, target: { id: 'c' } }],
        nodes: { 23: { id: 23 }, c: { id: 'c' } }
      });
    });
  });
});