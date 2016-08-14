import assert from 'assert'
import Renderer from './Renderer'
import sinon from 'sinon'

let graphMock = {
  layoutMinX: 0,
  layoutMaxX: 10,
  layoutMinY: -6,
  layoutMaxY: 10,
  edges: [{}],
  nodes: {
    1: {layoutPosX: 3, layoutPosY: 4},
    2: {}
  }
}

let domEl = {}

describe('Renderer', () => {

  describe('#constructor', () => {

    it('using document querySelector', () => {
      let origDoc = global.document
      let spyDoc = sinon.spy()
      // Document stub
      global.document = { querySelector: spyDoc }
      let renderer = new Renderer('#element', graphMock)
      assert(spyDoc.calledOnce)
      global.document = origDoc
    })

    it('using jQuery', () => {
      let origJQ = global.$
      let spyJQ = sinon.spy()
      // jQuery stub
      global.$ = spyJQ
      let renderer = new Renderer('#element', graphMock)
      assert(spyJQ.calledOnce)
      global.$ = origJQ
    })

    it('using dom element', () => {
      let origDoc = global.document
      let spyDoc = sinon.spy()

      let origJQ = global.$
      let spyJQ = sinon.spy()


      let renderer = new Renderer(domEl, graphMock)

      assert(!spyJQ.called)
      assert(!spyDoc.called)

      global.document = origDoc
      global.$ = origJQ
    })

    it('set default width and height', () => {
      let renderer = new Renderer(domEl, graphMock)
      assert.equal(renderer.width, 400)
      assert.equal(renderer.height, 300)
    })

  })

  describe('#draw', () => {
    let renderer = new Renderer(domEl, graphMock)
    renderer.drawNode = sinon.spy()
    renderer.drawEdge = sinon.spy()
    renderer.draw()

    it('set factorX and factorY', () => {
      assert.equal(renderer.factorX, 32)
      assert.equal(renderer.factorY, 13.75)
    })

    it('calls drawNode', () => {
      assert(renderer.drawNode.called)
    })

    it('calls drawEdge', () => {
      assert(renderer.drawEdge.called)
    })
  })

  describe('#translate', () => {
    let renderer = new Renderer(domEl, graphMock)

    it('scales coordinates into frame', () => {
      assert.deepEqual(graphMock.nodes[1].point, [136, 178])
    })
  })

})
