"use strict";

import fs from "fs";
import path from "path";
import autoprefixer from "autoprefixer";
// import sprites from 'postcss-sprites';
// import assets from 'postcss-assets';
import pxtorem from "postcss-pxtorem";
import criticalCSS from "postcss-critical-split";
import rucksack from "rucksack-css";
import cssnano from "cssnano";

export default function(
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
  dirs
) {
  let entries = config.entries;
  let dest = path.join(taskTarget, dirs.assets, dirs.styles.replace(/^_/, ""));
  let taskDir = path.join(taskTarget);
  let spriteDest = path.join(
    taskTarget,
    dirs.assets,
    dirs.images.replace(/^_/, "")
  );

  const sassTask = isCritical => {
    let src = path
      .join(dirs.source, dirs.styles, entries.css)
      .replace(/\\/g, "/");

    return gulp
      .src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.if(!isCritical, plugins.sourcemaps.init()))
      .pipe(plugins.cssGlobbing({ extensions: [".scss"] }))
      .pipe(
        plugins
          .sass({
            precision: 10,
            includePaths: [
              path.join(dirs.source, dirs.styles),
              path.join(dirs.source, dirs.modules),
              "node_modules/bootstrap/scss"
            ]
          })
          .on("error", plugins.sass.logError)
      )
      .pipe(
        plugins.postcss([
          autoprefixer(),
          rucksack({ reporter: true }),
          pxtorem({ replace: false }),
          // assets({
          //     loadPaths: [spriteDest]
          // }),
          //// Use spriteurl function to get the correct url
          //// Note: the sprite.png needs to be minified/optimized
          // sprites({
          //     stylesheetPath: dest,
          //     spritePath: spriteDest,
          //     basePath: taskTarget,
          //     filterBy: (image) => (!/\.png$/.test(image.url)) ? Promise.reject() : Promise.resolve(),
          //     verbose: true,
          // }),
          isCritical
            ? criticalCSS({
                blockTag: "crit",
                startTag: "crit:start",
                endTag: "crit:end",
                output: isCritical ? "critical" : "rest"
              })
            : () => {},
          cssnano({
            rebase: false,
            discardComments: { removeAll: true },
            discardUnused: false,
            minifyFontValues: true,
            filterOptimiser: true,
            functionOptimiser: true,
            minifyParams: true,
            normalizeUrl: true,
            reduceBackgroundRepeat: true,
            convertValues: true,
            discardEmpty: true,
            minifySelectors: true,
            reduceInitial: true,
            reduceIdents: false,
            mergeRules: false,
            zindex: false
          })
        ])
      )
      .pipe(
        plugins.rename(function(path) {
          // Remove 'source' directory as well as prefixed folder underscores
          // Ex: 'src/_styles' --> '/styles'
          path.dirname = path.dirname.replace(dirs.source, "").replace("_", "");

          if (isCritical) {
            path.basename = "critical";
          }
        })
      )
      .pipe(plugins.if(!isCritical, plugins.sourcemaps.write("./")))
      .pipe(
        plugins.if(
          isCritical && !args.production,
          plugins.size({ gzip: true, showFiles: true })
        )
      )
      .pipe(gulp.dest(dest))
      .on("end", !args.production ? browserSync.reload : function() {});
  };

  // Sass compilation
  gulp.task("sass-rest", () => {
    return sassTask();
  });

  gulp.task("sass-critical", () => {
    return sassTask(true);
  });

  gulp.task(
    "sass",
    gulp.series(gulp.parallel("sass-rest", "sass-critical"), "copy_otherWWW")
  );
}
