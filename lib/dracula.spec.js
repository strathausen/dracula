'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _dracula = require('./dracula');

var _dracula2 = _interopRequireDefault(_dracula);

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
      _assert2.default.deepEqual(node, { id: 'bar', edges: [] });
    });

    it('via number ID', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23);
      _assert2.default.deepEqual(node, { id: 23, edges: [] });
    });

    it('via object with id', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode({ id: 23 });
      _assert2.default.deepEqual(node, { id: 23, edges: [] });
    });

    it('via object without id', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode({ foo: 'bar' });
      _assert2.default.deepEqual(_typeof(node.id), 'string');
    });

    it('via id and object', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23, { foo: 'bar' });
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23', edges: [] });
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
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23', edges: [] });
      _assert2.default.equal(Object.keys(graph.toJSON().nodes).length, 0);
    });

    it('via node instance', function () {
      var graph = _dracula2.default.create();
      var node = graph.addNode(23, { foo: 'bar' });
      var deleted = graph.removeNode(node);
      _assert2.default.deepEqual(node, { foo: 'bar', id: '23', edges: [] });
      _assert2.default.deepEqual(deleted, { foo: 'bar', id: '23', edges: [] });
      _assert2.default.equal(Object.keys(graph.toJSON().nodes).length, 0);
    });

    it('remove node that is part of an edge', function () {
      var graph = _dracula2.default.create();
      graph.addEdge('a', 'b');
      var removedNode = graph.removeNode('a');
      var resultNode = { id: 'a', edges: [] };
      _assert2.default.deepEqual(removedNode, resultNode);
      _assert2.default.deepEqual(graph.toJSON().edges, []);
    });
  });

  describe('#addEdge', function () {
    it('create edge', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      var result = { source: { id: 'a' }, target: { id: 'b' }, style: {} };
      result.source.edges = [result];
      result.target.edges = [result];
      _assert2.default.deepEqual(edge, result);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });

    it('create edge with data', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b', 'fancy');
      var result = { source: { id: 'a' }, target: { id: 'b' }, style: 'fancy' };
      result.source.edges = [result];
      result.target.edges = [result];
      _assert2.default.deepEqual(edge, result);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });
  });

  describe('#removeEdge', function () {
    it('remove by providing two node ids', function () {
      var graph = _dracula2.default.create();
      graph.addEdge('a', 'b');
      var removed = graph.removeEdge('a', 'b');
      var result = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} };
      _assert2.default.deepEqual(removed, result);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove by providing two nodes', function () {
      var graph = _dracula2.default.create();
      graph.addEdge('a', 'b');
      var removed = graph.removeEdge({ id: 'a' }, { id: 'b' });
      var resultEdge = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} };
      _assert2.default.deepEqual(removed, resultEdge);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove by providing edge', function () {
      var graph = _dracula2.default.create();
      var edge = graph.addEdge('a', 'b');
      var removed = graph.removeEdge(edge);
      var resultEdge = { source: { id: 'a', edges: [] }, target: { id: 'b', edges: [] }, style: {} };
      _assert2.default.deepEqual(removed, resultEdge);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 0);
    });

    it('remove non-existing edge', function () {
      var graph = _dracula2.default.create();
      graph.addEdge('a', 'b');
      var removed = graph.removeEdge('b', 'c');
      var resultEdge = { source: { id: 'a' }, target: { id: 'b' }, style: {} };
      resultEdge.source.edges = [resultEdge];
      resultEdge.target.edges = [resultEdge];
      _assert2.default.deepEqual(removed, undefined);
      _assert2.default.equal(Object.keys(graph.toJSON().edges).length, 1);
    });
  });

  describe('#toJSON', function () {
    var graph = _dracula2.default.create();
    graph.addNode(23);
    graph.addEdge(23, 'c');
    var resultSource = { id: 23 };
    var resultTarget = { id: 'c' };
    var resultEdge = { source: resultSource, target: resultTarget, style: {} };
    resultSource.edges = [resultEdge];
    resultTarget.edges = [resultEdge];

    it('represent graph structure', function () {
      _assert2.default.deepEqual(graph.toJSON(), {
        edges: [resultEdge],
        nodes: { 23: resultSource, c: resultTarget }
      });
    });
  });
});