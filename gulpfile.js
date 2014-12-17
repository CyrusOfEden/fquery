var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var del = require('del');

var config = {
  src: 'src/**/*.js',
  dist: 'dist'
};

gulp.task('clean', function() {
  del(['dist']);
});

gulp.task('build', function() {
  return gulp.src(config.src).
    pipe(changed(config.dist)).
    pipe(concat('query.js')).
    pipe(uglify()).
    pipe(gulp.dest(config.dist));
});

gulp.task('default', function() {
  gulp.watch(config.src, ['build']);
});
