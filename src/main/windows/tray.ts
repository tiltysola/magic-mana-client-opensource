import { BrowserWindow, shell } from 'electron';
import path from 'path';

export let win: BrowserWindow;

export default () => {
  if (win && !win.isDestroyed()) {
    win.focus();
  } else {
    win = new BrowserWindow({
      width: 180,
      height: 212,
      frame: false,
      resizable: false,
      show: false,
      transparent: true,
      alwaysOnTop: true,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, './preload.js'),
        webSecurity: false,
        devTools: process.env.ENV === 'development',
      },
    });

    if (process.platform === 'win32') {
      win.setSkipTaskbar(true);
    }

    win.on('blur', () => {
      if (!win.webContents.isDevToolsOpened()) {
        win.hide();
      }
    });

    win.on('close', (e) => {
      e.preventDefault();
      win.hide();
    });

    win.webContents.on('will-navigate', (e, url) => {
      if (!/http:\/\/localhost|file:\/\/\//.test(url)) {
        e.preventDefault();
        shell.openExternal(url);
      }
    });

    process.env.ENV !== 'development'
      ? win.loadFile(path.join(__dirname, '../render/index.html'), {
        hash: '#/tray',
      })
      : win.loadURL(`http://localhost:${process.env.PORT}#/tray`);
  }
};
