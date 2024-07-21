---
title: "An es6 frontend workflow"
pubDate: "2014-09-14T22:12:03.284Z"
description: ""
cover: "/images/blog/map.webp"
category: "js"
---

I'm working on a project that requires a quite substantial amount of frontend javascript work. As part of this I wanted to use the next version of javascript (es6) to undo some of the general javascript craziness and give me more options for structuring the app.

For a list of some of the features in es6 see [here](https://www.w3schools.com/js/js_es6.asp)

## es6 in current jscript

A lot of the features of in es6 can be emulated using the constructs in the current version of javascript. E.g. javascript devs have been simulating classes and modules for ages by using function encapsulation. As such you can use a transpiler to convert your nice es6 code to something that will run in current browsers.

## Modules

### current javascript

To allow me to use modules in current javascript I'm using [browserify](http://browserify.org/). This lets me define frontend modules in the same way I do in node (using the CommonJs module standard). As a bonus it also lets me use lots of npm modules unchanged in my frontend code.

Under browserify a file of javascript does not export anything usable by default. So, given a file called foo.js that contained the following:

```js
function sayHello() {
  return "Hello";
}

module.exports = sayHello;
```

I could reference the file in bar.js:

```js
var hello = require("./foo");

console.log(hello());
```

and the console would get 'hello' printed to it. Anything I do not explicitly export from foo.js would not be accessible to bar.js.

### es6

es6 modules are actually quite similar to the common Js standard used above, the syntax is just a little different.

```js
// foo.js
function sayHello() {
  return "Hello";
}

export { sayHello };

// bar.js
import { sayHello } from "./foo";

console.log(sayHello());
```

Note: googling around for the es6 module syntax will give you lots of different structures, the spec has changed a lot but this is what seems to work right now.

As part of my workflow I want to keep using current jscript modules as well as my fancy new es6 modules and classes. As such I need a workflow that does the following:

- Look at all the es6 modules and convert them to their current javascript equivalents.
- Resolve the modules and bundle them together into something the frontend can use.

## Tools

I need something to run all of the steps above so my tool list ends up as follows:

Task runner: [gulp.js](http://gulpjs.com/). Grunt is also fine but having played with both I much prefer the gulp syntax.

Convert es6: [es6ify](https://github.com/thlorenz/es6ify). This is a plugin for browserify that uses traceur to convert es6 to es5.

Module bundler: [browserify](http://browserify.org/).

## Setting up gulp

Go follow the instructions [on the gulp website](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

also make sure you have ran

`npm init`

in the root of your project so that you have a project.json.

Use the following command in the root of your project to tell npm to fetch all the npm modules we will need:

`npm install browserify es6ify vinyl-source-stream`

Note: you may be tempted to use the gulp-browserify plugin, don't, it hides features we need and even the gulp devs say it shouldn't be used (I wasted ages trying to figure out what was wrong thanks to this).

Then we need to setup our gulpfile:

```js
var gulp = require("gulp");
var browserify = require("browserify");
var es6ify = require("es6ify");
var source = require("vinyl-source-stream");

var paths = {
  //all js files

  scripts: ["./src/js/**/*.js", "!./src/js/build/**/*.js"],
  //entry point for browserify
  browserify: "./src/js/main.js",
  //output folder
  bundleFolder: "src/js/build/",
  //output file name
  bundleName: "bundle.js",
};

gulp.task("browserify", function () {
  return (
    browserify({ debug: true })
      //try to transform all files except node modules from es6 to es5
      .add(es6ify.runtime)
      .require(require.resolve(paths.browserify), { entry: true })
      .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
      //bundle the result together
      .bundle()
      //output file name
      .pipe(source(paths.bundleName))
      //output file location
      .pipe(gulp.dest(paths.bundleFolder))
  );
});
```

## The end result

You can then use es6 features throughout your code. You can also still use commonJS style modules but you will need to use the require('./foo.js') syntax to import these modules rather than the es6 syntax.

## es6 and jshint

If you run jshint against your code (and you should) it will moan about the es6 keywords. To fix this set "esnext" to "true" in your .jshintrc file.
