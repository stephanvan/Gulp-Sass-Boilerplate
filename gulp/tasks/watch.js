var config = require('../config.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  gulp.watch(config.base.src + config.path.sass + config.files.sassAll, ['sass']);
  gulp.watch(config.base.src + config.path.js + config.files.js, ['app']);
  gulp.watch(config.base.src + config.path.views + config.files.html, ['html']);

});
