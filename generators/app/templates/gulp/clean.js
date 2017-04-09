'use strict';

import path from 'path';
import del from 'del';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  // Clean
  if(!args.production){
  	gulp.task('clean', del.bind(null, [
	    path.join(dirs.temporary)
	  ]));
  } else{
  	gulp.task('clean', []);
  }
}
