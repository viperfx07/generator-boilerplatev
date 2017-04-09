'use strict';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  // BrowserSync
  gulp.task('browserSync', () => {
    browserSync.init({
      open: 'local',
      startPath: config.baseUrl,
      server: {
        baseDir: taskTarget,
        routes: (() => {
          let routes = {};

          // Map base URL to routes
          routes[config.baseUrl] = taskTarget;

          return routes;
        })()
      }
    });
  });
}
