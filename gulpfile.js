const { version } = require('./package.json');
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const groupMedia = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
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
		css: src + "/css/base.scss",
		js: src + "/js/app.js",
	},
	dest: {
		css: dest + "/css/",
		js: dest + "/js/",
	},
	watch: {
		css: src + "/styles/**/*",
		js: src + "/js/**/*",
	},
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
};

// build
const build = gulp.series(clean, gulp.parallel(css, js));

// errors
const error = (err) => {
	notify.onError({
		title: "Error",
		message: "<%= error.message %>",
	})(err);
};

exports.css = css;
exports.js = js;
exports.clean = clean;
exports.bump = bump;
exports.watch = watch;
exports.build = build;
exports.default = gulp.series(build, gulp.parallel(watch));
exports.error = error;
