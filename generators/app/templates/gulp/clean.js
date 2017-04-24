'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  // Clean
  if(!args.production){
  	const del = require('del');
  	gulp.task('clean', del.bind(null, [
	    path.join(dirs.temporary)
	  ]));
  } else{
  	gulp.task('clean', []);
  }
}