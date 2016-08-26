Personal Site starter - JVL 
========================================

TOC
---

* [Setup][]
* [Build System (Gulp)][]
* [Credits][]
* [Style Guides and Opinions][]


Setup
-----

1. Checkout project locally.
2. From inside the framework directory, run `npm install`.
3. From inside the framework directory, run `gulp`.



Build System (Gulp)
--------------------

### Setup Instructions

1. Install nodejs, if it isn't already: `brew install node`
2. Install the gulp command line interface via npm: `npm install gulp --save-dev`
3. Get documentation for the build system by running: `gulp`

### Paths

The build system will build to two different directories, at least one of which you should make accessible via a web server.

* __./app__ : Debug build of the web site.
* __./dist__ : Compiled production build of the web site

Credits
-----

This is a basic site starter that puts together several frameworks and 
borrows from a bunch of others and is what I've been using as a starting
point for custom websites lately. It uses SASS and Gulp.

This is primarly for personal use, but if you need a good starting point for
a responsive site that doesn't use a javascript framework for data-binding,
this is a good place to start. Included are a bunch of mix-ins that I've found
very useful.

### Dependencies

* Material Design Lite 
* FontAwesome
* jQuery 
* animate.css



Style Guides and Opinions
-------------------------

1. Indentation is always 2 spaces
2. The leading bracket of a block should be on the same line as the preceding keyword (e.g. "function {", "if {")
3. Lines should *usually* be under 80 characters in length and *never* be more than 120 characters in length
4. When reasonable, group variable declarations into one declaration at the beginning of a function
# the-opie-starter-kit
