var path = require('path');
var config = require('../config.json');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var sasslint = require('gulp-sass-lint');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass:lint', function() {
  return gulp.src([
      config.base.src + config.path.sass + config.files.sassAll,
      '!**/_bootstrap.scss'
      // '!**/_variables.scss'
    ])
    .pipe(sasslint({
      options: { 'config-file': path.resolve(__dirname, '../sass-lint.yml') }
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('sass:build', function() {
  return gulp.src(config.base.src + config.path.sass + config.files.sass)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS > 6', 'ie >= 8', 'Safari >= 7'],
      cascade: false
    }))
    .pipe(gulp.dest(config.base.build + config.path.css))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass:lib', function() {
  return gulp.src(config.base.src + config.path.sassLibs + config.files.sassAll)
    .pipe(sass())
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(config.base.build + config.path.css))
});

gulp.task('sass', function(cb) {
  runSequence('sass:lint', 'sass:build', 'sass:lib', cb);
});
