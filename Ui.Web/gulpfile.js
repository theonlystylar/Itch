"use strict";

var gulp = require("gulp");
var typescript = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tslintStyle = require("gulp-tslint-stylish");
var sourcemaps = require("gulp-sourcemaps");
var inject = require("gulp-inject");
var rimraf = require("gulp-rimraf");
var Config = require("./gulpfile.config");

var config = new Config();

// clean - clear old js files
gulp.task("clean", function() {
	gulp.src("wwwroot/js/app", { read: false })
		.pipe(rimraf());
});

// typescript lint - ensure our code is written well
gulp.task("ts-lint", function() {
	return gulp.src(config.allTypeScript)
		.pipe(tslint())
		.pipe(tslint.report(tslintStyle, {
			emitError: false,
			sort: true,
			bell: true
		}));
});

// typescript compile
gulp.task("ts-compile", ["ts-lint", "clean"], function() {
	var tsResult = gulp.src("src/**/*.ts")
		.pipe(sourcemaps.init())
		.pipe(typescript());
	return tsResult.js
		.pipe(sourcemaps.write(".", { sourceRoot: "src/app" }))
		.pipe(gulp.dest("wwwroot/js"));
});

// inject compiled js into index.html page
gulp.task("inject", ["ts-compile"], function() {
	var target = gulp.src("wwwroot/index.html");
	var sources = gulp.src(["wwwroot/js/app/**/*.js"], { read: false });

	return target.pipe(inject(sources, { relative: true }))
		.pipe(gulp.dest("wwwroot"));
});

// Watch - Run when working on typescript so typescript is automatically compiled after each file is saved
gulp.task("ts-watch", function() {
	gulp.watch("src/**/*.ts", ["inject"]);
});

// build solution
gulp.task("build", ["inject"]);