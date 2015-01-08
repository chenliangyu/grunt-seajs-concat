/**
 * Created by Administrator on 2015/1/6.
 */
var ast = require("cmd-util").ast;
var util = require("./util");
exports.init = function(grunt){
    var exports = {};
    function jsProcessor(file,options){
        var fileData = grunt.file.read(file.src);
        grunt.log.verbose.writeln("start parse dependencies for "+file.src);
        var deps = parseDependencies(fileData,options);
        deps.unshift(file.src);
        if(options.includes && options.includes.length){
          var files = grunt.file.expand(options.includes);
          deps = files.concat(deps);
        }
        if(options.preload && options.preload.length){
            options.preload.forEach(function(preload){
                var src = util.id2Uri(preload,"",options);
                if(!grunt.file.exists(src)){
                  grunt.fail.warn("preload source file " +src+ " not found");
                }else{
                  var fileData = grunt.file.read(src);
                  var preloadDeps = parseDependencies(fileData,options);
                  preloadDeps.unshift(src);
                  deps = preloadDeps.concat(deps);
                }
            });
        }
        var src = concatFile(deps,options);
        return src.join(grunt.util.normalizelf(grunt.util.linefeed));
    }
    function parseDependencies(fileData,options){
          var result =[];
          var metas = getMetas(fileData);
          var rootIds = metas.map(function(meta){
                return util.realPath(meta.id,options);
          });
          getDeps(result,metas,rootIds,options);
          return result;
    }
    function getMetas(fileData){
        var astCache;
        try{
            astCache = ast.getAst(fileData);
        }catch(e){
            grunt.log.error('js parse error ' +fileData.red);
            grunt.fail.fatal(e.message + ' [ line:' + e.line + ', col:' + e.col + ', pos:' + e.pos + ' ]');
        }
        return ast.parse(astCache);
    }
    function getDeps(result,metas,rootIds,options){
           metas.forEach(function(meta){
                var deps = meta.dependencies;
               deps = meta.dependencies.filter(function(dep){
                   var matchExclude = false;
                   if(options.excludeDependencies && options.excludeDependencies.length) {
                       matchExclude = options.excludeDependencies.some(function (excludeDep) {
                           if (grunt.util.kindOf(excludeDep) === "string") {
                               return excludeDep === dep;
                           } else if (grunt.util.kindOf(excludeDep) === "regexp") {
                               return excludeDep.test(dep);
                           } else {
                               return true;
                           }
                       });
                       if (matchExclude) {
                           grunt.log.writeln("exclude dependency " + dep);
                       }
                   }
                  var isAb = util.isAbsolute(dep);
                   if(isAb){
                       grunt.log.writeln("find uri dependencies "+dep);
                   }
                 return !matchExclude && !isAb;
               });
                var depSources = deps.map(function(dep){
                  return util.id2Uri(dep,util.realPath(meta.id,options),options);
                });
                grunt.log.verbose.writeln("start to add direct dependencies of "+meta.id+" to result array");
                addDeps(result,depSources,rootIds,options);
           });
    }
    function addDeps(result,depSources,rootIds,options){
        depSources.forEach(function(src){
            if(!grunt.file.exists(src)){
                grunt.fail.warn("source file "+src+ " not found");
            }else if(result.indexOf(src)!==-1 || rootIds.indexOf(src)!==-1){
                grunt.fail.warn('found circle dependencies '+src);
            }else if(options.excludes && options.excludes.length && grunt.file.isMatch(options.excludes,src)){
                grunt.log.verbose.writeln("exclude file "+src+" from src code");
            }else{
                grunt.log.verbose.writeln("add dependency "+src+" to result array ");
                result.push(src);
                var fileData = grunt.file.read(src);
                var depMetas = getMetas(fileData);
                getDeps(result,depMetas,rootIds,options);
            }
        });
    }
    function concatFile(deps){
        return deps.map(function(dep){
            return grunt.file.read(dep);
        });
    }
    exports.jsProcessor = jsProcessor;
    exports.parseDependencies = parseDependencies;
    exports.concatFile = concatFile;
    return exports;
};