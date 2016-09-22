var config = require('../config.json');
var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var browserSync = require('browser-sync').create();

gulp.task('htmlhint:build', function() {
  return gulp.src(config.base.build)
    .pipe(htmlhint('./gulp/.htmlhintrc'))
    .pipe(htmlhint.reporter());
});

gulp.task('html', function() {
  return gulp.src(config.base.src + config.path.views + config.files.html)
    .pipe(gulp.dest(config.base.build))
    .pipe(browserSync.reload({ stream: true }))
});
