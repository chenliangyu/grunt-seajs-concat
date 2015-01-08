/**
 * Created by Administrator on 2015/1/7.
 */
var util = require("../tasks/lib/util");
describe("Test Util functionality",function(){
    it("should return the real path",function(){
            var id = "fixtures/test";
            var options = {
                base : "spec"
            }
            expect(util.realPath(id,options)).toEqual("spec\\fixtures\\test.js");
    });
    it("should check the if the id is an uri",function(){
        var id = "http://code.jquery.com/jquery.min.js";
        expect(util.isAbsolute(id)).toBeTruthy();
        id = "//code.jquery.com/jquery.min.js";
        expect(util.isAbsolute(id)).toBeTruthy();
        id = "file://code.jquery.com";
        expect(util.isAbsolute(id)).toBeTruthy();
    });
    it("should return the corrent uri",function(){
          var id = "common/test";
          var no_id = "no/test";
         var refUri = "";
          var options = {
              base : "front_end/js"
          };
         expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
          options = {
               base : "front_end",
               paths : {
                   common : "js/common"
               }
           };
          expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
          expect(util.id2Uri(no_id,refUri,options)).toEqual("front_end\\no\\test.js");
           id = "test";
           options = {
               base : "front_end",
               alias : {
                   test : "js/common/test"
               }
           };
           expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
           expect(util.id2Uri(no_id,refUri,options)).toEqual("front_end\\no\\test.js");
           id = "test";
           options = {
                base : "front_end",
                alias : {
                    test : "common/test"
                },
               paths : {
                   common : "js/common"
               }
           };
           expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
           expect(util.id2Uri(no_id,refUri,options)).toEqual("front_end\\no\\test.js");
           id = "./test";
           refUri = "front_end/js/common/main";
           expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
           id = "../test";
           refUri = "front_end/js/common/main/index";
           expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\js\\common\\test.js");
           id = "/test";
           expect(util.id2Uri(id,refUri,options)).toEqual("test.js");
           id = "common/test";
           options = {
                base : "front_end",
                paths : {
                    common : "/front_end/common"
                }
            };
            expect(util.id2Uri(id,refUri,options)).toEqual("front_end\\common\\test.js");
            id = "test";
            options = {
                base : "front_end",
                alias : {
                    test : "/common/test"
                }
            };
            expect(util.id2Uri(id,refUri,options)).toEqual("common\\test.js");
    });
});