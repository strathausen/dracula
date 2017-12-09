// Core
const dracula = require('./dracula').default

// Layouts
const spring = require('./layout/spring').default
const orderedTree = require('./layout/ordered_tree').default
const tournamentTree = require('./layout/tournament_tree').default

// Renderers
const raphael = require('./renderer/raphael').default

module.exports.Graph = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree,
}

module.exports.Renderer = {
  Raphael: raphael,
}
