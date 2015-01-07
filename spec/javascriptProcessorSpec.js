/**
 * Created by Administrator on 2015/1/7.
 */
var grunt = require("grunt");
var jsProcessor = require("../tasks/lib/script").init(grunt);
var util = require("../tasks/lib/util");
describe("Test Javascript concat processor",function(){
    it("should get all dependencies and sub dependencies for single seajs module and no circle in dependencies",function(){
        spyOn(util,"id2Uri").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        spyOn(util,"realPath").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        var deps = jsProcessor.parseDependencies(grunt.file.read("spec/fixtures/index.js"),{});
        expect(deps).toEqual(["spec/fixtures/deps-index-1.js","spec/fixtures/deps-index-3.js","spec/fixtures/deps-index-2.js","spec/fixtures/deps-index-4.js","spec/fixtures/deps-index-5.js"]);
    });
    it("should get all dependencies and sub dependencies for multiple seajs module and no circle in dependencies",function(){
        spyOn(util,"id2Uri").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        spyOn(util,"realPath").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        var deps = jsProcessor.parseDependencies(grunt.file.read("spec/fixtures/multiple.js"),{});
        expect(deps).toEqual(["spec/fixtures/deps-index-1.js","spec/fixtures/deps-index-3.js","spec/fixtures/deps-index-2.js","spec/fixtures/deps-index-4.js","spec/fixtures/deps-index-5.js"]);
    });
    it("should get all dependencies and sub dependencies for seajs module when found circle in dependencies",function(){
        spyOn(util,"id2Uri").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        spyOn(util,"realPath").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        var deps = jsProcessor.parseDependencies(grunt.file.read("spec/fixtures/circle.js"),{});
        expect(deps).toEqual(["spec/fixtures/deps-circle-1.js", 'spec/fixtures/deps-circle-2.js']);
    });
    it("should concat file content",function(){
        var fileData = jsProcessor.concatFile(["spec/fixtures/concat-1.js", 'spec/fixtures/concat-2.js']);
        expect(fileData).toEqual(["11111","22222"]);
    });
    it("should concat file via module dependencies",function(){
        spyOn(util,"id2Uri").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        spyOn(util,"realPath").and.callFake(function(id,options){
            return id.replace("./","spec/fixtures/") + ".js";
        });
        var data = jsProcessor.jsProcessor({
            src : "spec/fixtures/circle.js"
        },{});
        expect(data).toEqual(grunt.file.read("spec/expected/circle.js"));
    });
});