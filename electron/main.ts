import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

import { MenuActions } from '../src/enums';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Image processing',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  setMainMenu();
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'renderer/index.html')}`,
  );
  mainWindow.on('closed', () => (mainWindow = null));

  if (isDev) {
    globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.reload();
    });
  }
};

const setMainMenu = () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            mainWindow?.webContents.send(MenuActions.OpenFile);
          },
        },
      ],
    },
  ]));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
