const path = require('path');
const express = require('express');
const eapp = express();
const { app, BrowserWindow, ipcMain } = require('electron');
const server = eapp.listen(3001);
const io = require('socket.io')(server, { cors: { origin: '*' } });

var clients = [];
var mainWindow;

io.on('connection', (socket) => {
  socket.on('client_join', (data) => {
    data.socket = socket.id;
    data.ip = socket.client.conn.remoteAddress;
    data.key = socket.id;

    clients.push(data);

    mainWindow.webContents.send('clients_data', clients);
  });

  socket.on('disconnect', () => {
    var found = false;

    while (!found) {
      clients.forEach((client, index) => {
        if (client.socket == socket.id) {
          clients.splice(index, 1);
          found = true;
        }
      });
    }

    mainWindow.webContents.send('clients_data', clients);
  });
});

ipcMain.on('clients_refresh', () => {
  clients = [];
  io.emit('request_data');
});

function createWindow() {
  mainWindow = new BrowserWindow({
    resizable: false,
    height: 600,
    width: 1250,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    title: 'Cloud',
  });

  mainWindow.setMenu(null);

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
