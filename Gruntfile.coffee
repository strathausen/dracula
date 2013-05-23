module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    jshint:
      all: [
        'lib/*.js'
      ]

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.registerTask 'default', [
    'jshint'
  ]
