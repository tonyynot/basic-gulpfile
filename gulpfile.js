var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var src = {
    scss: 'src/scss/*.scss',
    css:  'src/css',
    html: 'src/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', browserSync.reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass({ includePaths: ['./node_modules/breakpoint-sass/stylesheets']
            }))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve']);
