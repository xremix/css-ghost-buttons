var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-cssnano');

var paths = {
	src: "src/*.scss",
	dist: "dist/",
}

gulp.task('default', ['watch', 'build']);

gulp.task('build', function() {
  return gulp.src(paths.src)
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
    }))
  .pipe(gulp.dest(paths.dist))
  .pipe(minifyCSS())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});