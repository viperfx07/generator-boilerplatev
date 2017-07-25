'use strict';

import path from 'path';
import serial from 'run-sequence';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  // Watch task
  gulp.task('watch', () => {
    if (!args.production) {
      // Styles
      gulp.watch([
        path.join(dirs.source, dirs.styles, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.modules, '**/*.{scss,sass}')
      ], ['sass']);

      // Scripts
      gulp.watch([
        path.join(dirs.source, dirs.scripts, '**/*.{js,vue}')], ['webpack']);

      // Fonts
      // Use gulp-watch plugins to recognized new files.
      // there's a bug on Windows when using gulp.watch
     plugins.watch(
        path.join(dirs.source, dirs.fonts, '**/*.{svg,ttf,eot,woff,woff2}'),
        () => gulp.start('fonts'));

      // Icon font
      gulp.watch([
        path.join(dirs.source, dirs.icons, '**/*.svg'),
        path.join(dirs.source, dirs.styles, '_generic_icons_template.scss')
      ], ()=>{ serial(['iconfont', 'fonts'], 'sass'); });

      // Pug Templates
      gulp.watch([
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.json')
      ], ['pug']);

      // Copy
      gulp.watch([
        path.join(dirs.source, '**/*'),
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
        '!' + path.join(dirs.source, '**/*.pug')
      ], ['copy']);

      // Images
      gulp.watch([
        path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
      ], ['imagemin']);

      // Icons
      gulp.watch([
        path.join(dirs.source, dirs.icons, '**/*.{svg}')
      ], ['iconfont']);

      // All other files
      gulp.watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js,svg,ttf,eot,woff,woff2}')
      ]).on('change', browserSync.reload);
    }
  });
}
