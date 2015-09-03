'use strict';

require('crash-reporter').start();

var app = require("app");
var BrowserWindow = require("browser-window");
var ipc = require("ipc");

var mainWindow = null;
var listeners = null;
var models = null;

app.on('window-all-closed', function() {
		if (process.platform != 'darwin') {
			app.quit();
		}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	listeners = require(__dirname + '/listeners.js');
	models = require(__dirname + '/models.js');
	
	listeners.listen(ipc, models);
	mainWindow.loadUrl('file://' + __dirname + '/../index.html');

	// Open the devtools.
	mainWindow.openDevTools({detach: true});

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null;
	});
});