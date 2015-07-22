var gulp = require('gulp');
var coffee = require('gulp-coffee');
var cjsx = require('gulp-cjsx');
var gutil = require('gulp-util');
var babel = require('gulp-babel');


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


gulp.task('babel', function() {
  gulp.src('src/js/**/*.js')
    .pipe(babel())
    // files get added to the root folder rather than a dist folder
    // because it makes requireing them easier
    .pipe(gulp.dest('./'))
});


gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['babel']);
  gulp.watch('src/js/components/*.coffee', ['coffee-react']);
  gulp.watch('src/js/utils/*.coffee', ['coffee']);
});


gulp.task('default', ['watch', 'coffee-react', 'coffee', 'babel']);