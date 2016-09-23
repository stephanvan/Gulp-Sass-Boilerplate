var config = require('../config.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var arg = require('yargs').argv;
var ghPages = require('gulp-gh-pages');
var sftp = require('gulp-sftp');

gulp.task('gh-pages', function() {
  if (arg.m && arg.m.trim() !== '') {
    config.ghPages.message = arg.m;
  }
  if (arg.b && arg.b.trim() !== '') {
    config.ghPages.branch = arg.b;
  }
  return gulp
    .src(config.base.build + '**/*')
    .pipe(ghPages(config.ghPages));
});

gulp.task('sftp', function() {
  return gulp
    .src(config.base.build)
    .pipe(sftp({
      host: config.ftp.ftpHost,
      user: config.ftp.ftpUsername,
      pass: config.ftp.ftpPassword,
      remotePath: config.ftp.ftpBasePath
    }));
});
gulp.task('deploy-gh-pages', function(cb) {
  return runSequence('build', 'gh-pages', cb);
});

gulp.task('deploy-ftp', function(cb) {
  return runSequence('build', 'sftp', cb)
});

gulp.task('deploy-all', function(cb) {
  return runSequence('gh-pages', 'sftp', cb);
});

gulp.task('deploy', function(cb) {
  var deploy = arg.all ? 'deploy-all' : (arg.ftp ? 'deploy-ftp' : 'deploy-gh-pages');
  return runSequence(deploy, cb);
}());
