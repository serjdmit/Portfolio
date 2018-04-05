const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const moduleImporter = require('sass-module-importer');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const concat = require('gulp-concat');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },    
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/',
        sprite: './src/images/sprite/'
    },
    video: {
        src: 'src/video/*.*',
        dest: 'build/assets/video/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    },
    sprites: {
        src: 'src/images/svg/*.*',
        dest: 'build/assets/images/',
        sprite: '../sprite.svg',
        scss: {
            dest:'../../../styles/common/_sprite.scss',
			template: 'src/styles/template/_sprite_template.scss' 
        }
    },
    scripts: {
        app: 'src/scripts/app.js',
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            importer: moduleImporter()
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}

// svg
function sprites() {
	return gulp.src(paths.sprites.src)
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
                    sprite: paths.sprites.sprite,
                    example: {
                        dest: '../tmp/spriteSvgDemo.html'
                    },
					render: {
						scss: {
							dest: paths.sprites.scss.dest,
							template: paths.sprites.scss.template
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(paths.images.sprite));
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src(paths.scripts.app)
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// foundation.js
function scriptsFoundation() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            // './node_modules/jquery-ui-dist/jquery-ui.min.js',
            // './node_modules/slick-carousel/slick/slick.min.js',
            './node_modules/waypoints/lib/noframework.waypoints.min.js'
        ])
        .pipe(concat('foundation.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.video.src, video);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.sprites.src, sprites);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// просто переносим видео
function video() {
    return gulp.src(paths.video.src)
        .pipe(gulp.dest(paths.video.dest));
}

// просто переносим шрифты
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.sprites = sprites;
exports.images = images;
exports.video = video;
exports.fonts = fonts;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, video, fonts, sprites, scripts, scriptsFoundation),
    gulp.parallel(watch, server)
));