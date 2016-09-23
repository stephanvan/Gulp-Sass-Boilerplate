var config = require('../config.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.base.build
    },
    reloadDebounce: 2000
  })
});

