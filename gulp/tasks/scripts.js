var config = require('../config.json');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var addSrc = require('gulp-add-src');
var browserSync = require('browser-sync').create();


gulp.task('vendor', function() {
  return gulp.src(config.vendor.js)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(config.base.build + config.path.js));
});

// gulp.task('js:build', function() {
//     var libJs = conf.base.src + conf.files.libJs;

//     gulp.src(config.base.src + config.files.js)
//         .pipe(jshint('./gulp/.jshintrc'))
//         .pipe(jshint.reporter('jshint-stylish'))
//         .pipe(addSrc(libJs))
//         .pipe(gulp.dest(config.base.build));
// });

gulp.task('app', function() {
  return gulp.src(config.base.src + config.path.js + config.files.js)
    .pipe(jshint('./gulp/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(config.base.build + config.path.js))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function(cb) {
  runSequence('vendor', 'app', cb);
});
