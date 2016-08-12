import assert from 'assert'
import Renderer from './Renderer'
import sinon from 'sinon'

class MockRenderer extends Renderer {
  drawNode() {
  }

  drawEdge() {
  }
}

let graphMock = {
  edges: [],
  nodes: {
    1: {},
    2: {}
  }
}

describe('Renderer', () => {

  describe('#constructor', () => {

    it('using document querySelector', () => {
      let origDoc = global.document
      let spy = sinon.spy()
      // Document stub
      global.document = { querySelector: spy }
      let renderer = new Renderer('#element', graphMock)
      assert(spy.calledOnce)
      global.document = origDoc
    })

    it('using jQuery', () => {
      let origJQ = global.window
      let spy = sinon.spy()
      // jQuery stub
      global.$ = spy
      let renderer = new Renderer('#element', graphMock)
      assert(spy.calledOnce)
      global.$ = origJQ
    })

    it('using dom element', () => {
      let domEl = {}

    })

  })

  describe('#draw', () => {
  })

  describe('#translate', () => {
  })

})
