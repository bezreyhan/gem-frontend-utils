var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var changed = require('gulp-changed');
var watchify = require('watchify');


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


function linter(srcs) {
  return gulp.src(srcs)
  .pipe(eslint())
  .pipe(eslint.format())
}

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.js', './src/js/**/*.jsx'])
  // only passes through files that changed.
  // searches through the directory and diffs for changes
  .pipe(changed('./', {extension: '.js'}))
  .pipe(eslint())
  .pipe(eslint.format())
});


gulp.task('babel', ['lint'], function() {
  gulp.src(['src/js/**/*.js', 'src/js/**/*.jsx'])
    .pipe(plumber())
    .pipe(babel())
    .on('error', handleErrors)
    // files get added to the root folder rather than a dist folder
    // because it makes requiring them easier
    .pipe(gulp.dest('./'))
});


gulp.task('watch', function() {
  gulp.watch(['src/js/**/*.js', 'src/js/**/*.jsx'], ['babel']);
  gulp.watch('src/js/utils/*.coffee', ['coffee']);
});


gulp.task('default', ['watch', 'babel']);
