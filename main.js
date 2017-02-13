//Electron main file simple config
var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 768, icon: __dirname + '/app/img/icon.ico'});

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  //mainWindow.openDevTools();
  mainWindow.setMenu(null);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
