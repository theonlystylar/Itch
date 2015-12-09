/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
	del = require("del"),
	rimraf = require("rimraf"),
	concat = require("gulp-concat"),
	cssmin = require("gulp-cssmin"),
	sourcemaps = require("gulp-sourcemaps"),
	tslint = require("gulp-tslint"),
	tslintStyle = require("gulp-tslint-stylish"),
	typescript = require("gulp-typescript"),
	uglify = require("gulp-uglify"),
	project = require("./project.json");

var paths = {
	webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function(cb) {
	rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function(cb) {
	rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function() {
	gulp.src([paths.js, "!" + paths.minJs], {
			base: "."
		})
		.pipe(concat(paths.concatJsDest))
		.pipe(uglify())
		.pipe(gulp.dest("."));
});

gulp.task("min:css", function() {
	gulp.src([paths.css, "!" + paths.minCss])
		.pipe(concat(paths.concatCssDest))
		.pipe(cssmin())
		.pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

/*
 * Copy bower files to wwwroot
 */
gulp.task("copy:bower", function() {
	gulp.src([
			"bower_components/bootstrap/dist/js/bootstrap*.js",
			"bower_components/bootstrap/dist/css/bootstrap*.css",
			"bower_components/bootstrap/dist/fonts/*",
			"bower_components/jquery/dist/jquery*.js",
			"bower_components/requirejs/require.js"
		], { base: "./bower_components" }) // used "base" option to preserve component file structure
		.pipe(gulp.dest("wwwroot/lib"));
});

/*
 * Run typescript tasks.
 */
var tsSourcePaths = [
];
var tsConcatDetination = [
	"./wwwroot/js/**/*.*"
];
var tsProject = typescript.createProject("tsconfig.json");
gulp.task("ts", ["ts:lint", "ts:clean"], function() {
	return gulp.src([
			"./Scripts/Core/**/*.ts",
			"./Scripts/Client/**/*.ts"
		]) // all your ts files here (check the path)
		.pipe(sourcemaps.init())
		.pipe(typescript({
			sortOutput: true,
			module: "amd"
		}))
		.js // compile with tsc, ordered with _reference.ts
		//.pipe(addsrc('external.js')) // add an external javascript file (if needed)
		//.pipe(concat("client.js")) // concat all in one file
		.pipe(sourcemaps.write(".")) // generate the .map
		.pipe(gulp.dest(paths.webroot + "js")); // write all in the dist folder
});

/*
 * Lint all custom typescript files.
 */
gulp.task("ts:lint", function() {
	return gulp.src("./Scripts/**/*.ts")
		.pipe(tslint())
		.pipe(tslint.report(tslintStyle, {
			emitError: false,
			sort: true,
			bell: true
		}));
});

/*
 * Remove old compiled js from destination
 */
gulp.task("ts:clean", function() {
	return del(paths.webroot + "js/**/*");
});