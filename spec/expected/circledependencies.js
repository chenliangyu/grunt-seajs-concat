define("spec/fixtures/index",["./deps-index-1","./deps-index-2"],function(require){require("./deps-index-1");require("./deps-index-2");})
define("spec/fixtures/deps-index-1",["./deps-index-3"],function(require){require("./deps-index-3");});
define("spec/fixtures/deps-index-3",[],function(require){});
define("spec/fixtures/deps-index-2",["./deps-index-4","./deps-index-5"],function(require){require("./deps-index-4");require("./deps-index-5");});
define("spec/fixtures/deps-index-4",[],function(require){});
define("test/fixtures/deps-index-5",[],function(require){});