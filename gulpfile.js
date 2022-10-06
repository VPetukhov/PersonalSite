const { version } = require('./package.json');
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const groupMedia = require("gulp-group-css-media-queries");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const rigger = require("gulp-rigger");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const del = require("del");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");
const bumper = require("gulp-bump");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const production = (argv.production === undefined) ? false : true;

// config
const src = "src";
const dest = "build";

const config = {
	src: {
		css: src + "/styles/scss/base.scss",
		js: src + "/js/app.js",
		img: src + "/media/img/**/*",
		favicon: src + "/media/favicon/**/*",
		fonts: src + "/media/fonts/**/*",
		html: src + "/files/index.html",
	},
	dest: {
		css: dest + "/css/",
		js: dest + "/js/",
		img: dest + "/img/",
		favicon: dest,
		fonts: dest + "/fonts/",
		html: dest,
	},
	watch: {
		css: src + "/styles/**/*",
		js: src + "/js/**/*",
		img: src + "/media/img/**/*",
		favicon: src + "/media/favicon/**/*",
		fonts: src + "/media/fonts/**/*",
		html: src + "/files/**/*",
	},
};

const server = () => {
	sync.init({
		server: {
			baseDir: dest,
		},
		open: false,
		notify: false,
	});
};

// css
const css = () => {
	return gulp
		.src(config.src.css)
		.pipe(plumber({ errorHandler: error }))
		.pipe(sass().on("error", sass.logError))
		.pipe(groupMedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
			})
		)
		.pipe(gulpif(
			production,
			cleanCSS({
				level : {
					1 : {
						specialComments : 0
					}
				}
			}),
			cleanCSS({
				format: 'beautify',
				level : 0
			})
		))
		.pipe(rename("app.css"))
		.pipe(gulp.dest(config.dest.css))
		.pipe(sync.stream());
};

const js = () => {
	return gulp
		.src(config.src.js)
		.pipe(plumber({ errorHandler: error }))
		.pipe(
			webpackStream({
				mode: "none",
				target: ['web', 'es5'],
				output: {
					filename: "app.js",
				},
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										["@babel/preset-env",
											{
												// "debug": true,
												"useBuiltIns" : "usage",
												"targets": {
													"browsers": ["last 2 versions", "ie >= 11"]
												},
												"corejs": 3
											}
										]
									]
								},
							},
						},
					],
				},
			})
		)
		.pipe(gulpif(production, uglify({
			compress: {
				drop_console : true
			}
		})))
		.pipe(gulp.dest(config.dest.js))
		.pipe(sync.stream());
};

// html
const html = () => {
	return gulp
		.src(config.src.html)
		.pipe(plumber({ errorHandler: error }))
		.pipe(rigger())
		.pipe(gulpif(production, htmlmin({ collapseWhitespace: true })))
		.pipe(replace('{{ version }}', version))
		.pipe(gulp.dest(config.dest.html))
		.pipe(sync.stream());
};

// fonts
const fonts = () => {
	return gulp
		.src(config.src.fonts)
		.pipe(plumber({ errorHandler: error }))
		.pipe(gulp.dest(config.dest.fonts))
		.pipe(sync.stream());
};

// img
const img = () => {
	return gulp
		.src(config.src.img)
		.pipe(plumber({ errorHandler: error }))
		.pipe(gulp.dest(config.dest.img))
		.pipe(sync.stream());
};

// favicon
const favicon = () => {
	return gulp
		.src(config.src.favicon)
		.pipe(plumber({ errorHandler: error }))
		.pipe(gulp.dest(config.dest.favicon))
		.pipe(sync.stream());
};

// bump
const bump = () => {
	return gulp.src('./package.json')
	.pipe(bumper({
		type: argv.type
	}))
	.pipe(gulp.dest('./'))
	.pipe(sync.stream());
};

// clean
const clean = () => {
	return del(dest, { force: true });
};

// watch
const watch = () => {
	gulp.watch(config.watch.css, gulp.series(css));
	gulp.watch(config.watch.js, gulp.series(js));
	gulp.watch(config.watch.img, gulp.series(img));
	gulp.watch(config.watch.favicon, gulp.series(favicon));
	gulp.watch(config.watch.html, gulp.series(html));
	gulp.watch(config.watch.fonts, gulp.series(fonts));
};

// build
const build = gulp.series(clean, gulp.parallel(css, js, img, favicon, html, fonts));

// errors
const error = (err) => {
	notify.onError({
		title: "Error",
		message: "<%= error.message %>",
	})(err);
};

exports.server = server;
exports.css = css;
exports.js = js;
exports.img = img;
exports.favicon = favicon;
exports.html = html;
exports.fonts = fonts;
exports.clean = clean;
exports.bump = bump;
exports.watch = watch;
exports.build = build;
exports.default = gulp.series(build, gulp.parallel(watch, server));
exports.error = error;
