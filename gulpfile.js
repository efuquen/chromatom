var gulp = require('gulp');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var es     = require('event-stream');

gulp.task('default', function() {
  return es.concat(
    gulp.src('./src/**/*.coffee').pipe(coffee({bare: true})),
    gulp.src('./src/**/*.js')
  ).pipe(gulp.dest('./dist'));
});
