/**
 * Created by Administrator on 2015/1/6.
 */
var ast = require("cmd-util")
exports.init = function(grunt){
    var jsProcessor = function(file,options){
        var fileData =grunt.file.read(file.src);
        var astCache;
        try{
            astCache = ast.getAst(fileData);
        }catch(e){
            grunt.log.error('js parse error ' + file.src.red);
            grunt.fail.fatal(e.message + ' [ line:' + e.line + ', col:' + e.col + ', pos:' + e.pos + ' ]');
        }
        var meta = ast.parseFirst(astCache);
        var deps = meta.dependencies;
        if(deps.length > 0){

        }
    }
    return {
        jsProcessor : jsProcessor
    }
}