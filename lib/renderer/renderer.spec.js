'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphMock = {
  layoutMinX: 0,
  layoutMaxX: 10,
  layoutMinY: -6,
  layoutMaxY: 10,
  edges: [{}],
  nodes: {
    1: { layoutPosX: 3, layoutPosY: 4 },
    2: {}
  }
};

var domEl = {};

describe('Renderer', function () {
  describe('#constructor', function () {
    it('using document querySelector', function () {
      var origDoc = global.document;
      var spyDoc = _sinon2.default.spy();
      // Document stub
      global.document = { querySelector: spyDoc };
      _renderer2.default.render('#element', graphMock);
      (0, _assert2.default)(spyDoc.calledOnce);
      global.document = origDoc;
    });

    it('using jQuery', function () {
      var origJQ = global.$;
      var spyJQ = _sinon2.default.spy(function () {
        return [];
      });
      // jQuery stub
      global.$ = spyJQ;
      _renderer2.default.render('#element', graphMock);
      (0, _assert2.default)(spyJQ.calledOnce);
      global.$ = origJQ;
    });

    it('using dom element', function () {
      var origDoc = global.document;
      var spyDoc = _sinon2.default.spy();

      var origJQ = global.$;
      var spyJQ = _sinon2.default.spy();

      _renderer2.default.render(domEl, graphMock);

      (0, _assert2.default)(!spyJQ.called);
      (0, _assert2.default)(!spyDoc.called);

      global.document = origDoc;
      global.$ = origJQ;
    });

    it('set default width and height', function () {
      var renderer = _renderer2.default.render(domEl, graphMock);
      _assert2.default.equal(renderer.width, 400);
      _assert2.default.equal(renderer.height, 300);
    });
  });

  describe('#draw', function () {
    var renderer = _renderer2.default.render(domEl, graphMock);
    renderer.drawNode = _sinon2.default.spy();
    renderer.drawEdge = _sinon2.default.spy();
    renderer.draw();

    it('set factorX and factorY', function () {
      _assert2.default.equal(renderer.factorX, 32);
      _assert2.default.equal(renderer.factorY, 13.75);
    });

    it('calls drawNode', function () {
      (0, _assert2.default)(renderer.drawNode.called);
    });

    it('calls drawEdge', function () {
      (0, _assert2.default)(renderer.drawEdge.called);
    });
  });

  describe('#translate', function () {
    _renderer2.default.render(domEl, graphMock);

    it('scales coordinates into frame', function () {
      _assert2.default.deepEqual(graphMock.nodes[1].point, [136, 178]);
    });
  });
});