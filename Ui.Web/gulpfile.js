"use strict";

var gulp = require("gulp");
var typescript = require("gulp-typescript");
var tslint = require("gulp-tslint");
var tslintStyle = require("gulp-tslint-stylish");
var sourcemaps = require("gulp-sourcemaps");
var inject = require("gulp-inject");
var rimraf = require("gulp-rimraf");
var merge = require("merge2");
var Config = require("./gulpfile.config");

var config = new Config();

// clean - clear old js files
gulp.task("clean", function() {
	gulp.src([config.typescriptOutputPath, config.typescriptDefinitionOutputPath], { read: false })
		.pipe(rimraf());
});

// typescript lint - ensure our code is written well
gulp.task("ts-lint", function() {
	return gulp.src(config.typescriptSourcePath)
		.pipe(tslint())
		.pipe(tslint.report(tslintStyle, {
			emitError: false,
			sort: true,
			bell: true
		}));
});

// typescript compile
var typescriptProject = typescript.createProject("tsconfig.json");

gulp.task("ts-compile", ["ts-lint", "clean"], function() {
	var sourcePaths = [
		config.typescriptSourcePath,
		config.typescriptDefinitionSourcePath
	];

	var result = gulp.src(sourcePaths)
		.pipe(sourcemaps.init())
		.pipe(typescript(typescriptProject));

	return merge([
		result.dts
		.pipe(gulp.dest(config.typescriptDefinitionOutputPath)),
		result.js
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(config.typescriptOutputPath))
	]);
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