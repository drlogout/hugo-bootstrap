var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var addsrc = require('gulp-add-src');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src([
            'src/scss/bootstrap/bootstrap.scss'
        ])
        .pipe(sass())
        .pipe(addsrc([
            'node_modules/video.js/dist/video-js.css',
            'src/css/*.css'
        ]))
        .pipe(concat('dep.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('js:dep', function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            // popper is a dependecy of bootstrap dropdown
            'node_modules/popper.js/dist/umd/popper.js',
            // bootstrap files, comment out if not needed
            // keep files in this order
            'node_modules/bootstrap/js/dist/util.js',
            'node_modules/bootstrap/js/dist/alert.js',
            'node_modules/bootstrap/js/dist/button.js',
            'node_modules/bootstrap/js/dist/carousel.js',
            'node_modules/bootstrap/js/dist/collapse.js',
            'node_modules/bootstrap/js/dist/dropdown.js',
            'node_modules/bootstrap/js/dist/modal.js',
            'node_modules/bootstrap/js/dist/scrollspy.js',
            'node_modules/bootstrap/js/dist/tab.js',
            'node_modules/bootstrap/js/dist/tooltip.js',
            'node_modules/bootstrap/js/dist/popover.js',
            //
            'node_modules/video.js/dist/video.js',
            'node_modules/lunr/lunr.js'
        ])
        .pipe(addsrc('src/js/vendor/*.js'))
        .pipe(concat('dep.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/assets/js'));
});

gulp.task('dist', ['sass', 'js:dep']);

gulp.task('watch', ['sass', 'js:dep'], function() {
    gulp.watch('src/scss/bootstrap/*.scss', ['sass']);
});

gulp.task('default', ['watch']);