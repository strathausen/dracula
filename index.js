// Core
var dracula = require('./dist/dracula').default

// Layouts
var spring = require('./dist/layout/spring').default
var orderedTree = require('./dist/layout/ordered_tree').default
var tournamentTree = require('./dist/layout/tournament_tree').default

// Renderers
var raphael = require('./dist/renderer/raphael').default

module.exports.Graph = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree
}

module.exports.Renderer = {
  Raphael: raphael,
}
