var gulp = require("gulp");
var eslint = require("gulp-eslint");
var rollup = require("gulp-better-rollup");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var babel = require("rollup-plugin-babel");

var destFolder = "./dist";
var pkg = require("./package.json");

gulp.task("default", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/lazyload.js").
			pipe(sourcemaps.init()).
			// ----------- linting --------------
			pipe(eslint()).
			pipe(eslint.format()).
			pipe(eslint.failAfterError()). // --> failing if errors
			// ----------- rolling up --------------
			pipe(
				rollup({ plugins: [babel()] }, [
					{
						file: "dist/lazyload-es2015.js",
						format: "es"
					},
					{
						file: "dist/lazyload-umd.js",
						format: "umd"
					},
					{
						file: "dist/lazyload-amd.js",
						format: "amd"
					}
				])
			).
			pipe(sourcemaps.write("")).
			pipe(gulp.dest(destFolder))
	);
});

gulp.task("watch", function() {
	gulp.watch("./src/**/*.js", ["default"]);
	// Other watchers
});
