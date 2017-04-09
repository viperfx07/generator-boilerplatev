'use strict';

import path from 'path';
import merge from 'merge-stream';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs, otherWWW) {
  let dest = path.join(taskTarget);

  // Copy
  gulp.task('copy', () => {
    return gulp.src([
        path.join(dirs.source, '**/*'),
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
        '!' + path.join(dirs.source, '**/*.pug')
      ])
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest));
  });

  // Copy other www
  gulp.task('copy_otherWWW', () => {
    let streams = [];

    otherWWW.forEach(function(item){
      let stream = gulp.src([
        path.join(taskTarget, '**/*'),
        '!' + path.join(taskTarget, '{**/\_*,**/\_*/**}'),
        '!' + path.join(taskTarget, '**/*.html'),
        '!' + path.join(taskTarget, '**/*.md'),
      ])
      .pipe(plugins.changed(item))
      .pipe(gulp.dest(item));
      streams.push(stream);
    });

    if(!args.production){
      plugins.notify({title:config.name, message: 'copy_otherWWW done'}).write('');
    }

    return merge(streams);
  });
}
