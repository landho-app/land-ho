const gulp = require("gulp");
const gutil = require("gulp-util");
const concat = require("gulp-concat");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const browserify = require("browserify");
const watchify = require("watchify");
const sourcemaps = require("gulp-sourcemaps");

const dependencies = [
	"alt",
	"react",
	"react-dom",
	"react-router",
	"underscore"
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task("vendor", function() {
	return gulp
		.src([
			"bower_components/jquery/dist/jquery.js",
			"bower_components/fastclick/lib/fastclick.js",
			"bower_components/bootstrap/dist/js/bootstrap.js"
		])
		.pipe(concat("vendor.js"))
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-vendor", function() {
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source("vendor.bundle.js"))
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify", ["browserify-vendor"], function() {
	return browserify("js/main.js")
		.external(dependencies)
		.transform(babelify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-watch", ["browserify-vendor"], function() {
	var bundler = watchify(browserify("js/main.js", watchify.args));
	bundler.external(dependencies);
	bundler.transform(babelify);
	bundler.on("update", rebundle);
	return rebundle();

	function rebundle() {
		var start = Date.now();
		return bundler
			.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red(err.toString()));
			})
			.on("end", function() {
				gutil.log(
					gutil.colors.green(
						"Finished rebundling JS in",
						Date.now() - start + "ms."
					)
				);
			})
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("js/build"));
	}
});

gulp.task("default", ["vendor", "browserify-watch"]);
gulp.task("build", ["vendor", "browserify"]);
