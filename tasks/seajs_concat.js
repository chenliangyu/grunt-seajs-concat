/*
 * grunt-seajs-concat
 * https://github.com/chenliangyu/grunt-seajs-concat
 *
 * Copyright (c) 2015 binavid chen
 * Licensed under the MIT license.
 */

'use strict';
var path = require("path");
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var script = require("./lib/script").init(grunt);
  var util = require("./lib/util");
  grunt.registerMultiTask('seajs_concat', 'concat seajs module file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        base : "",
        type : "js",
        alias : {},
        paths : {},
        preload : [],
        excludeDependencies:[],
        excludes : [],
        includes : [],
        processors : {
            "js" : script.jsProcessor
        }
    });
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var processor = options.processors[options.type],src;

      if(!processor){
          src = f.src.filter(function(filepath) {
              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file "' + filepath + '" not found.');
                  return false;
              } else {
                  return true;
              }
          }).map(function(filepath) {
             return grunt.file.read(filepath);
          }).join(grunt.util.normalizelf(grunt.util.linefeed));
      }else{
          src = processor({
              src : f.src
          },options);
     /*     src = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          }).map(function(filepath) {
             var extname = path.extname(filepath);
             var processor = options.processors[extname];
             if(!processor){
                 return grunt.file.read(filepath);
             }
             return  processor({
                  src : filepath
              },options);
          }).join(grunt.util.normalizelf(grunt.util.linefeed));*/
          // Write the destination file.
      }
      grunt.file.write(f.dest, src);
      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
