// Core
var dracula = require('./dist/dracula')

// Layouts
var spring = require('./dist/layout/spring')
var orderedTree = require('./dist/layout/ordered_tree')
var tournamentTree = require('./dist/layout/tournament_tree')

// Renderers
var raphael = require('./dist/renderer/raphael')
var snap = require('./dist/renderer/snap')

module.exports = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree
}

module.exports.Renderer = {
  Raphael: raphael,
  Snap: snap
}
