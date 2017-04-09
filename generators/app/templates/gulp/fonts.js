'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  let dest = path.join(taskTarget, dirs.assets, dirs.fonts.replace(/^_/, ''));
  // Copy
  gulp.task('fonts', () => {
    return gulp.src(path.join(dirs.source, dirs.fonts, '**/*'))
      .pipe(plugins.changed(dest))
      .pipe(plugins.plumber())
      .pipe(gulp.dest(dest));
  });
}