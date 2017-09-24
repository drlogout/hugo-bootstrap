var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var addsrc = require('gulp-add-src');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass:dep', function () {
    return gulp.src([
            'src/scss/bootstrap/bootstrap.scss'
        ])
        .pipe(sass())
        .pipe(addsrc('src/css/*.css'))
        .pipe(concat('dep.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('sass:app', function () {
    return gulp.src([
            'src/scss/custom.scss'
        ])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('css:minify:app', ['sass:app'], function () {
    return gulp.src([
            'static/assets/css/app.css'
        ])
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('js:dep', function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            // popper is a dependecy of bootstrap dropdown
            'node_modules/popper.js/dist/umd/popper.js',
            // bootstrap files, comment out if not needed
            'node_modules/bootstrap/js/dist/alert.js',
            'node_modules/bootstrap/js/dist/button.js',
            'node_modules/bootstrap/js/dist/carousel.js',
            'node_modules/bootstrap/js/dist/collapse.js',
            'node_modules/bootstrap/js/dist/dropdown.js',
            'node_modules/bootstrap/js/dist/modal.js',
            'node_modules/bootstrap/js/dist/popover.js',
            'node_modules/bootstrap/js/dist/scrollspy.js',
            'node_modules/bootstrap/js/dist/tab.js',
            'node_modules/bootstrap/js/dist/tooltip.js',
            'node_modules/bootstrap/js/dist/util.js'
        ])
        .pipe(addsrc('src/js/vendor/*.js'))
        .pipe(concat('dep.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/assets/js'));
});