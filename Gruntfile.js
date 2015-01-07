/*
 * grunt-seajs-concat
 * https://github.com/chenliangyu/grunt-seajs-concat
 *
 * Copyright (c) 2015 binavid chen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      example: ['tmp'],
      test : ["test/tmp"]
    },

    // Configuration to be run (and then tested).
    seajs_concat: {
        options : {
            base : "example",
            alias : {

            },
            paths : {

            },
            preload : {

            }
        },
        common : {
            options : {
                create : true,
                createPath : "example/util"
            },
            src : "example/common/**/*.js",
            dest : "tmp/common/common.js"
        },
        main : {
            src : "example/page/index.js",
            dest : "tmp/page/index.js"
        }
    },

    // Unit tests.
    "jasmine_node": {
      all: ['test/']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean:example', 'seajs_concat', 'jasmine_node',"clean:test"]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
