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
  // Watch task
  gulp.task("watch", () => {
    if (!args.production) {
      // Styles
      gulp.watch(
        [
          path.join(dirs.source, dirs.styles, "**/*.{scss,sass}"),
          path.join(dirs.source, dirs.modules, "**/*.{scss,sass}")
        ].map(item => item.replace(/\\/g, "/")),
        gulp.series("sass")
      );

      // Scripts
      gulp.watch(
        [path.join(dirs.source, dirs.scripts, "**/*.{js,vue,scss}")].map(item =>
          item.replace(/\\/g, "/")
        ),
        gulp.series("webpack")
      );

      // Fonts
      plugins.watch(
        path
          .join(dirs.source, dirs.fonts, "**/*.{svg,ttf,eot,woff,woff2}")
          .replace(/\\/g, "/"),
        gulp.series("copy-fonts", "copy_otherWWW")
      );

      // Images
      plugins.watch(
        path
          .join(dirs.source, dirs.images, "**/*.{svg,jpg,jpeg,png,bmp,gif}")
          .replace(/\\/g, "/"),
        gulp.series("copy-images", "copy_otherWWW")
      );

      // Icon font
      gulp.watch(
        [
          path.join(dirs.source, dirs.icons, "**/*.svg"),
          path.join(dirs.source, dirs.styles, "_generic_icons_template.scss")
        ].map(item => item.replace(/\\/g, "/")),
        gulp.series(gulp.parallel("icon", "copy-fonts"), "sass")
      );

      // Pug Templates
      gulp.watch(
        [
          path.join(dirs.source, "**/*.pug"),
          path.join(dirs.source, dirs.data, "**/*.json")
        ].map(item => item.replace(/\\/g, "/")),
        gulp.series("pug")
      );

      // Copy
      gulp.watch(
        [
          path.join(dirs.source, "**/*"),
          "!" + path.join(dirs.source, "{**/_*,**/_*/**}"),
          "!" + path.join(dirs.source, "**/*.pug")
        ].map(item => item.replace(/\\/g, "/")),
        gulp.series("copy")
      );

      // All other files
      gulp
        .watch(
          [
            path.join(dirs.temporary, "**/*"),
            "!" +
              path.join(
                dirs.temporary,
                "**/*.{css,map,html,js,svg,ttf,eot,woff,woff2}"
              )
          ].map(item => item.replace(/\\/g, "/"))
        )
        .on("change", browserSync.reload);
    }
  });
}
