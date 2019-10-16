"use strict";

import path from "path";

export default function(
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
  dirs
) {
  const _dest = path
    .join(taskTarget, `${dirs.assets}/${dirs.images.replace(/^_/, "")}/`)
    .replace(/\\/g, "/");
  const src = path
    .join(dirs.source, dirs.icons, "**/*.svg")
    .replace(/\\/g, "/");
  gulp.task("icon", () => {
    return gulp
      .src(src)
      .pipe(plugins.plumber())
      .pipe(
        plugins.svgSprite({
          mode: {
            symbol: {
              dest: ".",
              sprite: config.iconsSpriteFileName
            }
          }
        })
      )
      .pipe(gulp.dest(_dest));
  });
}
