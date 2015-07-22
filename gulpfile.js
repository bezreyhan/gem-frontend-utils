var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
var gutil = require('gulp-util');
var babel = require('gulp-babel');


gulp.task('coffee-react', function() {
  gulp.src('src/js/components/*.coffee')
    .pipe(cjsx({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('dist/js/components'))
})


gulp.task('babel', function() {
  gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['babel'])
  gulp.watch('src/js/components/*.coffee', ['coffee-react'])
})


gulp.task('default', ['watch', 'coffee-react', 'babel']);