# <%= _.titleize(projectName) %> readme

Generated on <%= (new Date).toISOString().split('T')[0] %> using
[<%= pkg.name %>@<%= pkg.version %>](https://github.com/viperfx07/generator-boilerplatev)

## Description

This is an example readme file.
Describe your site/app here.

## Technologies used

JavaScript
- [Webpack](http://webpack.js.org/) with ES6/2015 support through [Babel](https://babeljs.io/)
- [Node](https://nodejs.org/)

Styles
- [Sass](http://sass-lang.com/) via ([node-sass](https://github.com/sass/node-sass))

Markup
- [Pug](http://pugjs.org/)

Optimization
- [Imagemin](https://github.com/imagemin/imagemin)
- [Uglify](https://github.com/mishoo/UglifyJS)

Server
- [BrowserSync](http://www.browsersync.io/)

Automation
- [Gulp](http://gulpjs.com)

Code Management
- [Git](https://git-scm.com/)


## Automated tasks

This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:
`gulp`: initialize or do everyday development
`gulp --production=dev`:
Builds and copies out files through compilation of preprocessors and optimization of images to the destionation folder (set in `packages.json` under `CUSTOM CONFIGURATION`). _Run this to copy assets to __Assets__ folder in __DEVELOPMENT__ environment_
`gulp --production`: Same as `gulp serve --production` also run `gulp test` and  not boot up production server
`gulp serve`: Compiles preprocessors and boots up development server
`gulp serve --open`: Same as `gulp serve` but will also open up site/app in your default browser
`gulp serve --production`: Same as `gulp serve` but will run all production tasks so you can view the site/app in it's final optimized form

***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates)***