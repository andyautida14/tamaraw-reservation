'use strict';

var gulp				= require("gulp"),
		BrowserSync	= require("browser-sync"),
		babel				= require("gulp-babel"),
		gulpIf			= require("gulp-if"),
		runSequence	= require("run-sequence"),
		del					= require("del"),
		extend			= require("xtend"),
		vinylPaths	= require("vinyl-paths"),
		electron		= require("electron-prebuilt"),
		childProcess= require("child_process");

var browserSync = BrowserSync.create();

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
	static: "./src/*.json",
	dest: "./build"
};

gulp.task("clean", function(cb) {
	return gulp.src(config.dest + "/*", {read: false})
		.pipe(vinylPaths(del));
});

gulp.task("copy", ["copy:static", "copy:html", "copy:js"]);

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
		.pipe(gulp.dest(config.dest));
});

gulp.task("copy:js:renderer", function() {
	return gulp.src(config.scripts.js.renderer)
		.pipe(babel())
		.pipe(gulp.dest(config.dest))
		.pipe(gulpIf(browserSync.active, browserSync.stream()));
});

function runElectronApp(path, env) {
	var opt = {
		env: extend({NODE_ENV: 'development'}, env, process.env),
		stdio: 'inherit'
	};
	
	return childProcess.spawn(electron, [path], opt);
}

/**
 * TODO: Automatic update when code changes
 */
gulp.task("serve", function() {
	function getRootUrl(options) {
		return "http://localhost:" + options.get("port");
	}
	
	function getClientUrl(options) {
		var conn_utils = require("browser-sync/lib/connect-utils");
		var pathname = conn_utils.clientScript(options);
		return getRootUrl(options) + pathname;
	}
	
	var options = {
		ui: false,
		port: 3000,
		open: false,
		notify: false,
		logSnippet: false,
		socket: {
			domain: getRootUrl
		}
	};
	
	browserSync.init(options, function(err, bs) {
		if(err)
			return cb(err);
		
		runElectronApp(config.dest, {
			BROWSER_SYNC_CLIENT_URL: getClientUrl(bs.options)
		});
	});
});

gulp.task("watch", function() {
		gulp.watch(config.html, ["copy:html"], browserSync.reload);
		gulp.watch(config.scripts.js.main.concat(config.scripts.js.renderer), function() {
			runSequence("copy:js:main", "copy:js:renderer", browserSync.reload)
		});
});

gulp.task("default", function(callback) {
	runSequence("clean", ["copy:static", "copy:html", "copy:js"], "serve", "watch", callback);
});