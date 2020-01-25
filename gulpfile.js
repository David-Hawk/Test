const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');




// Таск для компиляции scss в css
gulp.task('scss', function() {
    return gulp.src('./src/scss/style.scss')
                    .pipe(sass())
                    .pipe(gulp.dest('./src/css/'))
                    .pipe(browserSync.stream());

});







// Галп для локального сервера.
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src/" // Из какой диреекторий будет открывать.
        }
    });
});

gulp.task('watch', function() {
    watch(['./src/*.html',  './src/*.js'], gulp.parallel(browserSync.reload))
    // watch('./src/*.css', gulp.parallel(browserSync.stream))

    watch('./src/scss/**/*.scss', function() {
        setTimeout(gulp.parallel('scss'), 1000);
    });
});

gulp.task('default', gulp.series('scss', gulp.parallel('server', 'watch')));


// gulp.task('hello', function(cl) {
//     console.log("Hello, from Gulp");
//     cl();
// });

// gulp.task('good', function(cl) {
//     console.log("Good ,good");
//     cl();
// });

// Последовательный  запуск - series.
// gulp.task('default' , gulp.series('hello', 'good'));

// Паралельный  запуск - parallel.
// gulp.task('default' , gulp.parallel('hello', 'good'));





// Запуск дефолтного таска/задача. В терминале пишем: gulp
// gulp.task('default', function(cl) {
//     console.log("Default gulp task.")
//    cl();
// });
