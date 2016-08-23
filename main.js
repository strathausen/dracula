// Core
var dracula = require('./src/dracula').default

// Layouts
var spring = require('./src/layout/spring').default
var orderedTree = require('./src/layout/ordered_tree').default
var tournamentTree = require('./src/layout/tournament_tree').default

// Renderers
var raphael = require('./src/renderer/raphael').default

module.exports.Graph = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree
}

module.exports.Renderer = {
  Raphael: raphael,
}
