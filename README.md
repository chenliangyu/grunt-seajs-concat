# grunt-seajs-concat

> concat seajs module file,if it's a seajs module,must use [grunt-seajs-converter](https://github.com/chenliangyu/grunt-seajs-converter.git) to convert seajs module first,otherwise it only concat file like grunt-contrib-concat;

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-seajs-concat --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-seajs-concat');
```

## The "seajs_concat" task

### Overview
In your project's Gruntfile, add a section named `seajs_concat` to the data object passed into `grunt.initConfig()`.


```js
grunt.initConfig({
  seajs_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.base
Type: `String`
Default value: `""`

the real path of base defined in seajs;

#### options.alias
Type: `Object`
Default value: `{}`

alias defined in seajs;

#### options.paths
Type: `Object`
Default value: `{}`

paths defined in seajs;

#### options.preload
Type: `Array`
Default value: `[]`

preload defined in seajs;will be concated preload module and its dependencies first;

#### options.excludeDependencies
Type: `Array`
Default value: `[]`

exclude dependencies which equal the value in array or match the regexp in array;
example
```js
{
  excludeDependencies:["common",/^jquery/]
}
define("id",["common","jquery","jquery-ui"],function(){...})
//will not concat dependencies "common","jquery","jquery-ui";
```
#### options.excludes
Type: `Array`
Default value: `[]`

exclude dependencies which path is match file patterns in array;
example
```js
{
  excludes:["common/**/*.js","jquery/**/*.js"]
}
//will not concat js files under common and jquery folder;
```
#### options.includes
Type: `Array`
Default value: `[]`

include dependencies which path is match file patterns in array;
example
```js
{
  includes:["common/**/*.js","jquery/**/*.js"]
}
//will add js files under common and jquery folder;
```
#### options.processors
define custom processors;
example:
```js
{
  processors:[require("processorsfilepath").init(grunt).jsProcessor];
}
exports.init = function(grunt){
    var exports = {};
    /**args:
    * file:{src:source file path passed by grunt.initConfig({})}
    *
    **/
    function jsProcessor(file,options){

    }
    exports.jsProcessor = jsProcessor;
}
```
#### Default Options
```js
{
        base : "",
        alias : {},
        paths : {},
        preload : [],
        excludeDependencies:[],
        excludes : [],
        includes : [],
        processors : {
            ".js" : script.jsProcessor
        }
}
```
### Usage Examples
```js
grunt.initConfig({
  seajs_concat: {
    options : {
        base : "example"
    },
    common : {
        src : "example/common/common-*.js",
        dest : "tmp/common/common.js"
    },
    main : {
         options:{
            excludeDependencies : ["common/common"]
         },
         files : {
             "tmp/page/index.js" : ["example/page/index/index.js"],
             "tmp/page/inside.js" : ["example/page/inside/inside.js"]
         }
    }
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
