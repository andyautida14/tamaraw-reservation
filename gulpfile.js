'use strict';

var gulp						= require("gulp"),
		babel						= require("gulp-babel"),
		gulpIf					= require("gulp-if"),
		runSequence			= require("run-sequence"),
		del							= require("del"),
		extend					= require("xtend"),
		vinylPaths			= require("vinyl-paths"),
		electronServer	= require("electron-connect").server;

var config = {
	scripts: {
		js: {
			main: ["./src/main/**/*.js"],
			renderer: ["./src/renderer/**/*.js"],
			test: ["./src/text/*.spec.js"]
		}
	},
	html: [
		"./src/index.html",
		"./src/views/*.html"
	],
	dependencies: [
		"./src/node_modules/**/*"
	],
	static: "./src/*.json",
	dest: "./build"
};

var electron = null;

gulp.task("clean", function(cb) {
	return gulp.src(config.dest + "/*", {read: false})
		.pipe(vinylPaths(del));
});

gulp.task("copy", ["copy:static", "copy:html", "copy:js", "copy:deps"]);

gulp.task("copy:static", function() {
	return gulp.src(config.static)
		.pipe(gulp.dest(config.dest));
});

gulp.task("copy:html", function() {
	return gulp.src(config.html)
		.pipe(gulp.dest(config.dest));
});

gulp.task("copy:js", ["copy:js:main", "copy:js:renderer"]);

gulp.task("copy:js:main", function() {
	return gulp.src(config.scripts.js.main)
		.pipe(babel())
		.pipe(gulp.dest(config.dest + "/main"));
});

gulp.task("copy:js:renderer", function() {
	return gulp.src(config.scripts.js.renderer)
		.pipe(babel())
		.pipe(gulp.dest(config.dest + "/renderer"));
});

gulp.task("copy:deps", function() {
	return gulp.src(config.dependencies)
		.pipe(gulp.dest(config.dest + "/node_modules"));
});

gulp.task("serve", function() {
	var opt = {
		env: extend({NODE_ENV: 'development'}, process.env),
		stdio: 'inherit'
	};
	
	electron = electronServer.create({path: config.dest});
	
	electron.start();
});

gulp.task("watch", function() {
	gulp.watch(config.static, function(event) {
		runSequence("copy:static", "copy:deps", electron.restart);
	});
	gulp.watch(config.html, function(event) {
		runSequence("copy:html", electron.restart);
	});
	gulp.watch(config.scripts.js.renderer, function(event) {
		runSequence("copy:js:renderer", electron.restart)
	});
	gulp.watch(config.scripts.js.main, function(event) {
		runSequence("copy:js:main", electron.restart);
	});
});

gulp.task("default", function(callback) {
	runSequence("clean", ["copy:static", "copy:html", "copy:js", "copy:deps"], "serve", "watch", callback);
});