var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var validate = require('gulp-jsvalidate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

var CONFIG = {
  build: {
    src: [
      'src/utilities.js',
      'src/node/**/*.js',
      'src/collection/**/*.js'
    ],
    dist: 'dist/',
    template: 'src/template.js',
    out: {
      dev: 'fquery.js',
      min: 'fquery.min.js'
    }
  },
  test: {
    src: [
      'test/utilities.js',
      'test/node/**/*.js',
      'test/collection/**/*.js'
    ],
    dist: 'test/dist/',
    template: 'test/template.js',
    out: {
      dev: 'test.js'
    }
  }
};

gulp.task('minify', function() {
  var config = CONFIG.build;
  gulp.src(config.dist + config.out.dev).
    pipe(plumber()).
    pipe(uglify()).
    pipe(rename(config.out.min)).
    pipe(gulp.dest(config.dist));
});

gulp.task('prep-test', function() {
  var build = CONFIG.build,
      test = CONFIG.test;
  gulp.src(build.dist + build.out.dev).
    pipe(gulp.dest(test.dist));
});

['build', 'test'].forEach(function(task) {
  gulp.task(task, function() {
    var config = CONFIG[task];
    gulp.src(config.src).
      pipe(plumber()).
      pipe(concat(config.out.dev)).
      pipe(wrap({ src: config.template })).
      pipe(validate()).
      pipe(gulp.dest(config.dist));
  });
});

gulp.task('ci', function() {
  gulp.watch(CONFIG.build.src, ['build', 'minify', 'prep-test']);
  gulp.watch(CONFIG.test.src, ['test']);
});
