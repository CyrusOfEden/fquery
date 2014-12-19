var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var validate = require('gulp-jsvalidate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

var del = require('del');

var config = {
  src: 'src/modules/**/*.js',
  dist: 'dist/',
  template: 'src/fquery.js',
  outdev: 'fquery.js',
  outmin: 'fquery.min.js'
};

gulp.task('clean', function() {
  del([config.dist]);
});

gulp.task('validate', function() {
  gulp.src(config.src).
    pipe(plumber()).
    pipe(validate());
});

gulp.task('build', function() {
  gulp.src(config.src).
    pipe(plumber()).
    pipe(concat(config.outdev)).
    pipe(wrap({ src: config.template })).
    pipe(gulp.dest(config.dist));
});

gulp.task('minify', function() {
  gulp.src(config.dist + config.outdev).
    pipe(plumber()).
    pipe(rename(config.outmin)).
    pipe(uglify()).
    pipe(gulp.dest(config.dist));
});

gulp.task('default', function() {
  gulp.watch(config.src, ['validate', 'build', 'minify']);
});
