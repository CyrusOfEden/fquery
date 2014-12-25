var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var validate = require('gulp-jsvalidate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

var config = {
  src: [
    'src/utilities.js',
    'src/node/**/*.js',
    'src/collection/**/*.js'
  ],
  dist: 'dist/',
  template: 'src/template.js',
  test: {
    dist: 'test/',
    src: ['tests/**/*.js'],
    template: 'test/template.js'
  },
  build: {
    dev: 'fquery.js',
    min: 'fquery.min.js',
    test: 'fquery.test.js'
  }
};

gulp.task('build', function() {
  gulp.src(config.src).
    pipe(plumber()).
    pipe(concat(config.build.dev)).
    pipe(wrap({ src: config.template })).
    pipe(validate()).
    pipe(gulp.dest(config.dist));
});

gulp.task('minify', function() {
  gulp.src(config.dist + config.build.dev).
    pipe(plumber()).
    pipe(uglify()).
    pipe(rename(config.build.min)).
    pipe(gulp.dest(config.dist));
});

gulp.task('prep-test', function() {
  gulp.src(config.dist + config.outdev).
    pipe(gulp.dest(config.test.dist));

  gulp.src(config.test.src).
    pipe(concat(config.build.test)).
    pipe(wrap({ src: config.test.template })).
    pipe(validate()).
    pipe(gulp.dest(config.test.dist));
});

gulp.task('test', function() {
  gulp.watch(config.test.src, ['prep-test']);
});

gulp.task('default', function() {
  gulp.watch(config.src, ['build', 'minify']);
});
