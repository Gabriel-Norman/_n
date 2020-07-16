const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');
// const deleteEmpty = require('delete-empty');

const supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

const paths = {
    src:  './src',
    unused:  './unused',
    styles: {
    src: './src/sass/**/*.sass',
    dest: './dist/css'
    },
    scripts: {
    src: './src/js/**/*.js',
    dest: './dist/js'
    },
    prod: './production',
    node: './node_modules',
};

gulp.task('style', function () {
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
});

gulp.task('script', function () {
    //1. where is my js file
    return gulp.src(paths.scripts.src, { sourcemaps: true })
    //2. pass that file through js compiler
        .pipe(babel())
        .pipe(terser())
        .pipe(concat('app.min.js'))
    //3. where do I save the compiled JS?
        .pipe(gulp.dest(paths.scripts.dest))
    //4. stream changes to all browser
        .pipe(browserSync.stream());
});

// gulp watch per avviare il browserSync e controllare gli aggiornamenti dei file css e js
gulp.task('watch', function () {
    browserSync.init({
        proxy: "http://localhost:8888/n",
        port: "8080",
        notify: false
    });
    gulp.watch(paths.styles.src, gulp.series('style'));
    gulp.watch(paths.scripts.src, gulp.series('script'));
});

gulp.task('clean-prod', function () {
	return del([paths.prod + '/**']);
});

gulp.task(
	'prod',
	gulp.series(['clean-prod'], function () {
		return gulp
			.src(
				[
					'**/*',
                    `!${paths.prod}`,
					`!${paths.node}`,
					`!${paths.node}/**`,
					`!${paths.src}`,
					`!${paths.src}/**`,
					`!${paths.unused}`,
					`!${paths.unused}/**`,
					'!readme.txt',
					'!readme.md',
					'!package.json',
					'!package-lock.json',
					'!gulpfile.js',
					'*'
				],
				{ buffer: true }
			)
			.pipe(gulp.dest(paths.prod))
	})
);

// gulp.task('remove-folders', function () {
// 	return deleteEmpty('./production/');
// });

// gulp compile per creare una cartella "production" e mettere il sito online
gulp.task('compile', gulp.series('style', 'script', 'prod'));
