var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src([
            'node_modules/bootstrap/scss/bootstrap.scss',
            'src/scss/*scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('static/assets/css'));
})