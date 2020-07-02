const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

const supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

const paths = {
  styles: {
    src: './src/sass/**/*.sass',
    dest: './dist/css'
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './dist/js'
  }
};

// compile scss into css
function style() {
    //1. where is my sass file
    return gulp.src(paths.styles.src)
    //2. pass that file through sass compiler
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
    //3. compile with cssnano
        .pipe(cssnano({
            autoprefixer: {browsers: supported, add: true}
        }))
        .pipe(sourcemaps.write())
    //4. where do I save the compiled CSS?
        .pipe(gulp.dest(paths.styles.dest))
    //5. stream changes to all browser
        .pipe(browserSync.stream());
}

function script() {
    //1. where is my js file
    return gulp.src(paths.scripts.src, { sourcemaps: true })
    //2. pass that file through js compiler
        .pipe(babel())
        .pipe(terser())
        .pipe(concat('app.js'))
    //3. where do I save the compiled JS?
        .pipe(gulp.dest(paths.scripts.dest))
    //4. stream changes to all browser
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        proxy: "http://localhost:8888/n",
        port: "8080",
        notify: false
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, script);
    // gulp.watch(paths.scripts.src).on('change', browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.watch = watch;
