'use strict';

// gulp == gulp serve
// gulp --production=dev, copy (without minifying JS) to ./Assets (dirs.destionation)
// gulp --production is copy (with minifying) to ./Assets (dirs.destionation)

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import pjson from './package.json';
import minimist from 'minimist';
import wrench from 'wrench';
import serial from 'run-sequence';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

let config = pjson.config;
let args = minimist(process.argv.slice(2));
let dirs = config.directories;
let taskTarget = args.production ? dirs.destination : dirs.temporary;
let otherWWW = dirs.otherWWW;

// Create a new browserSync instance
let browserSync;
if(!args.production){
  browserSync = (require('browser-sync')).create();
}

const prodTasks = [
  'clean',
  'copy',
  'iconfont',
  'fonts',
  'sass',
  'webpack'
];

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive('./gulp').filter((file) => {
	const isJs = (/\.(js)$/i).test(file);
	if(args.production)
		return isJs && prodTasks.includes(file.split('.js')[0]);
	return isJs;
}).map((file) => {
	require('./gulp/' + file)(gulp, plugins, args, config, taskTarget, browserSync, dirs, otherWWW);
});

// Default task
gulp.task('default', ['clean'], () => {
  let taskSet = args.production ? 'build' : 'serve';
  console.log('Running gulp ' + taskSet);
  gulp.start(taskSet);
});

// Build production-ready code
gulp.task('build', ()=>{
  serial(['copy', 'iconfont', 'fonts', 'webpack'], 'sass');
});

// Server tasks with watch
gulp.task('serve', ()=>{
  serial(['imagemin', 'iconfont', 'fonts', 'pug','webpack', 'copy', 'watch'], 'sass', 'browserSync');
});

// Testing
gulp.task('test', ['eslint']);
