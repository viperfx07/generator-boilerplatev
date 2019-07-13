"use strict";

import path from "path";
import merge from "merge-stream";

export default function(
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
  dirs,
  otherWWW
) {
  let dest = path.join(taskTarget);

  gulp.task("copy-fonts", () => {
    let dest = path.join(taskTarget, dirs.assets, dirs.fonts.replace(/^_/, ""));
      return gulp
        .src(path.join(dirs.source, dirs.fonts, "**/*").replace(/\\/g, "/"))
        .pipe(plugins.changed(dest))
        .pipe(plugins.plumber())
        .pipe(gulp.dest(dest));
  });

  gulp.task("copy-images", () => {
    let dest = path.join(taskTarget, dirs.assets, dirs.images.replace(/^_/, ""));
      return gulp
        .src(path.join(dirs.source, dirs.images, "**/*").replace(/\\/g, "/"))
        .pipe(plugins.changed(dest))
        .pipe(plugins.plumber())
        .pipe(gulp.dest(dest));
  });

  // Copy
  gulp.task("copy-src-files", () => {
    return gulp
      .src(
        [
          path.join(dirs.source, "**/*"),
          "!" + path.join(dirs.source, "{**/_*,**/_*/**}"),
          "!" + path.join(dirs.source, "**/*.pug")
        ].map(item => item.replace(/\\/g, "/"))
      )
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest));
  });

  gulp.task("copy", gulp.parallel("copy-src-files", "copy-fonts", "copy-images"));

  // Copy other www
  gulp.task("copy_otherWWW", () => {
    let streams = [];

    otherWWW.forEach(function(item) {
      let stream = gulp
        .src(
          [
            path.join(taskTarget, "**/*"),
            "!" + path.join(taskTarget, "{**/_*,**/_*/**}"),
            "!" + path.join(taskTarget, "**/*.html"),
            "!" + path.join(taskTarget, "**/*.md")
          ].map(item => item.replace(/\\/g, "/"))
        )
        .pipe(plugins.changed(item))
        .pipe(gulp.dest(item));
      streams.push(stream);
    });

    if (!args.production) {
      plugins
        .notify({ title: config.name, message: "copy_otherWWW done" })
        .write("");
    }

    return merge(streams);
  });
}
