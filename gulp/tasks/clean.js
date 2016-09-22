var config = require('../config.json');
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
  return del(config.base.build, cb);
});
