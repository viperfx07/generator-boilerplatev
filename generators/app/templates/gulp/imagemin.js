'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import jpegoptim from 'imagemin-jpegoptim';
import pngquant from 'imagemin-pngquant';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
    let dest = path.join(taskTarget, dirs.assets, dirs.images.replace(/^_/, ''));

    // Imagemin
    gulp.task('imagemin', () => {
        return gulp.src(path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'))
            .pipe(plugins.imagemin([
                plugins.imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
                pngquant({speed: 1, quality:'85'}),
                jpegoptim({progressive: true, max: 85}),
            ], { verbose: true }))
            .pipe(gulp.dest(dest));
    });
}
