var aliasify   = require('aliasify');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var concat     = require('gulp-concat');
var coffee     = require('gulp-coffee');
var es         = require('event-stream');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');

gulp.task('watch', function() {
  return gulp.watch('./src/**/*', ['compile', 'package']);
});

gulp.task('compile', function() {
  return es.concat(
    gulp.src('./src/**/*.coffee').pipe(coffee({ bare: true })),
    gulp.src('./src/**/*.js')
  ).pipe(gulp.dest('./dist'));
});

gulp.task('package', ['compile'], function() {
  var b = browserify({
    entries: './dist/browser/main.js',
    debug: true,
  }).transform(aliasify, {
    aliases: {
      app:              './shims/app.js',
      'browser-window': './shims/browser-window.js',
      'crash-reporter': './shims/crash-reporter.js',
      nslog:            './shims/nslog.js',
    },
  });

  return b.bundle()
          .pipe(source('./dist/browser/main.js'))
          .pipe(buffer())
          .pipe(concat('background.js'))
          .pipe(gulp.dest('./package'));
});

gulp.task('default', ['compile', 'package', 'watch']);
