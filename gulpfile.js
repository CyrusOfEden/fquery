var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

var del = require('del');

var config = {
  src: 'src/modules/**/*.js',
  dist: 'dist'
};

gulp.task('clean', function() {
  del([config.dist]);
});

gulp.task('build', function() {
  return gulp.src(config.src).
    pipe(changed(config.dist)).
    pipe(concat('query.js')).
    pipe(wrap({ src: 'src/query.js' })).
    pipe(gulp.dest(config.dist));
});

gulp.task('minify', function() {
  return gulp.src([config.dist, 'query.js'].join('/')).
    pipe(uglify()).
    pipe(rename('query.min.js')).
    pipe(gulp.dest(config.dest));
});

gulp.task('default', function() {
  gulp.watch(config.src, ['build']);
});
