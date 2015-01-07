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
        var src = concatFile(deps,options);
        src.unshift(fileData);
        return src.join(grunt.util.normalizelf(grunt.util.linefeed));
    };
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
            grunt.log.error('js parse error ' +src.red);
            grunt.fail.fatal(e.message + ' [ line:' + e.line + ', col:' + e.col + ', pos:' + e.pos + ' ]');
        }
        return ast.parse(astCache);
    }
    function getDeps(result,metas,rootIds,options){
           metas.forEach(function(meta){
                var depSources = meta.dependencies.map(function(dep){
                        return util.id2Uri(dep,util.realPath(meta.id,options),options);
                });
                grunt.log.verbose.writeln("start to add direct dependencies of "+meta.id+" to result array");
                addDeps(result,depSources,rootIds,options);
           });
    }
    function addDeps(result,depSources,rootIds,options){
        depSources.forEach(function(src){
            if(result.indexOf(src)!==-1 || rootIds.indexOf(src)!==-1){
                grunt.fail.warn('found circle dependencies '+src);
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
        })
    };
    exports.jsProcessor = jsProcessor;
    exports.parseDependencies = parseDependencies;
    exports.concatFile = concatFile;
    return exports;
}