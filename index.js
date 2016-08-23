// Core
var dracula = require('./lib/dracula').default

// Layouts
var spring = require('./lib/layout/spring').default
var orderedTree = require('./lib/layout/ordered_tree').default
var tournamentTree = require('./lib/layout/tournament_tree').default

// Renderers
var raphael = require('./lib/renderer/raphael').default

module.exports.Graph = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree
}

module.exports.Renderer = {
  Raphael: raphael,
}
