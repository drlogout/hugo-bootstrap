var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src([
            'src/scss/style.scss'
        ])
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('js', function() {
    return gulp.src([
            'node_modules/bootstrap/js/dist/collapse.js'
        ])
        .pipe(gulp.concat('app.js'))
        .pipe(gulp.dest('static/assets/js'));
});
