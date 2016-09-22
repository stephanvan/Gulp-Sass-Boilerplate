var config = require('../config.json');
var gulp = require('gulp');

gulp.task('copy', function(cb) {
  return gulp.src(config.base.src + config.path.views + config.files.html)
    .pipe(gulp.dest(config.base.build))
});
