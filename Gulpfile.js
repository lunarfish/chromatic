const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('copy:vue', function () {
  return gulp.src('node_modules/vue/dist/*')
  .pipe(gulp.dest('./public/packages/vue'));
});

gulp.task('copy:vue-resource', function () {
  return gulp.src('node_modules/vue-resource/dist/*')
  .pipe(gulp.dest('./public/packages/vue-resource'));
});

gulp.task('copy:leaflet', function () {
  return gulp.src('node_modules/leaflet/dist/*')
  .pipe(gulp.dest('./public/packages/leaflet'));
});

gulp.task('sass:foundation', function() {
  return gulp.src(['build/scss/*'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/packages/foundation/css'));
});


gulp.task('copy:foundation', function () {
  return gulp.src('node_modules/foundation-sites/dist/js/*')
  .pipe(gulp.dest('./public/packages/foundation/js'));
});

gulp.task('default', gulp.series(
	'copy:vue',
	'copy:vue-resource',
	'copy:leaflet',
	'copy:foundation',
	'sass:foundation'
));