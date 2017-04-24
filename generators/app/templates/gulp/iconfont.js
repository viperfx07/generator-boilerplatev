'use strict';

import path from 'path';
import lodash from 'lodash';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs){
  let runTimestamp = Math.round(Date.now()/1000);
  let dest = path.join(taskTarget, dirs.assets, dirs.fonts.replace(/^_/, ''));

  //icon font settings
  let iconFontSettings ={
    fontName: 'g-icons', // the font-family named used in the css. use prefix for namespace
    fontPath: '/assets/fonts/', //relative path to the fonts file, assuming the css directory is the same level as the fonts directory
    className: 'g-icon' //associated with 'className' variable in template. will be the class name used in the css. use prefix for namespace
  };

  gulp.task('iconfont', () => {
    return gulp.src(path.join(dirs.source, dirs.icons, '**/*.svg'))
      .pipe(plugins.plumber())
      .pipe(plugins.changed(dest))
      .pipe(plugins.iconfont({
        fontName: iconFontSettings.fontName, // required 
        // appendUnicode: true, // recommended option 
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available 
        timestamp: runTimestamp, // recommended to get consistent builds when watching files 

        //If some font glyphs aren't converted properly you should append the normalize:true option and a fontHeight greater than 1000 (fontHeight: 1001).
        normalize: true, 
        fontHeight: 1001 
      }))
      .on('glyphs', (glyphs, options) => {
        gulp.src(path.join(dirs.source, dirs.icons, 'icons_template.scss'))
          .pipe(plugins.consolidate('lodash', {
            glyphs: glyphs,
            fontName: iconFontSettings.fontName,
            fontPath: iconFontSettings.fontPath,
            className: iconFontSettings.className
          }))
          .pipe(plugins.rename('_generic.icons.scss'))
          .pipe(gulp.dest(path.join(dirs.source, dirs.styles, '03_generic')));
      })
      .pipe(gulp.dest(dest));
  });

}