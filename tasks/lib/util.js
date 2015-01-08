/**
 * Created by Administrator on 2015/1/6.
 */
var path = require("path");
var PATHS_RE = /^([^/:]+)(\/.+)$/;
var ABSOLUTE_RE = /^\/\/.|:\//;
exports.realPath = function(id,options){
    return path.join(options.base,id)+".js";
};
exports.isAbsolute = function(id){
    return ABSOLUTE_RE.test(id);
};
exports.id2Uri = function(dep,refUri,options){
    dep = this.parseAlias(dep,options);
    dep = this.parsePaths(dep,options);
    var uri = this.addBase(dep,refUri,options);
    return uri + ".js";
};
exports.isVars = function(dep){
    return dep.indexOf("{")>-1;
};
exports.parseAlias = function(id,options){
    var alias = options.alias;
    return alias && typeof alias[id] ==="string" ? alias[id] : id;
};
exports.parsePaths = function(id,options){
    var paths = options.paths;
    var m;
    if (paths && (m = id.match(PATHS_RE)) && typeof paths[m[1]] === "string") {
        id = paths[m[1]] + m[2];
    }
    return id;
};
exports.addBase = function(id,refUri,options){
    var ret;
    var first = id.charAt(0);
    // Absolute
    if (this.isAbsolute(id)) {
        ret =id;
    }
    // Relative
    else if (first === ".") {
        ret = refUri?path.normalize(path.join(path.dirname(refUri),id)):id;
    }
    // Root
    else if (first === "/") {
        ret =  path.normalize(id.substring(1));
    }
    // Top-level
    else {
        ret = path.join(options.base, id);
    }
    return ret;
};