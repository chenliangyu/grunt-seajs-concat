define("spec/fixtures/circle",["./deps-circle-1"],function(){require("./deps-circle-1");});
define("spec/fixtures/deps-circle-1",["./circle","./deps-circle-2"],function(){require("./circle");require("./deps-circle-2");});
define("spec/fixtures/deps-circle-2",["./circle"],function(){require("./circle");});