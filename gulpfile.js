var gulp = require('gulp');
var coffee = require('gulp-coffee');
var cjsx = require('gulp-cjsx');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var changed = require('gulp-changed');


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


gulp.task('coffee-react', function() {
  gulp.src('src/js/components/*.coffee')
    .pipe(cjsx({bare: true}).on('error', gutil.log))
    // files get added to the root folder rather than a dist folder
    // because it makes requireing them easier
    .pipe(gulp.dest('components'))
});


gulp.task('coffee', function() {
  gulp.src('src/js/utils/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    // files get added to the root folder rather than a dist folder
    // because it makes requireing them easier
    .pipe(gulp.dest('utils'))
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

gulp.task('browserify', function() {
  var b = browserify({
    entries: './test/COMPONENT_TO_TEST.jsx',
    extensions: ['.coffee', '.js', '.jsx'],
    debug: true,
    transform: ['babelify', 'coffee-reactify']
  });

  return b
    .bundle()
    .on('error', handleErrors)
    // Use vinyl-source-stream to make the
    // stream gulp compatible. Specify the
    // desired output filename here.
    .pipe(source('COMPONENT_TO_TEST.js'))
    // Specify the output destination
    .pipe(gulp.dest('./test'))
});


gulp.task('watch', function() {
  gulp.watch(['src/js/**/*.js', 'src/js/**/*.jsx'], ['babel']);
  gulp.watch('src/js/components/*.coffee', ['coffee-react']);
  gulp.watch('src/js/utils/*.coffee', ['coffee']);
});


gulp.task('default', ['watch', 'coffee-react', 'coffee', 'babel']);