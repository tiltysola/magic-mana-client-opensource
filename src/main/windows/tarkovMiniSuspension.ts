import { app, BrowserWindow, shell } from 'electron';
import path from 'path';

import storage from '../utils/storage';
import createMainWindow, { win as mainWin } from './main';

export let win: BrowserWindow;

app.commandLine.appendSwitch('disable-site-isolation-trials');

export default () => {
  if (!storage.get('eula')) {
    if (mainWin && !mainWin.isDestroyed()) {
      mainWin.focus();
    } else {
      createMainWindow();
    }
    return;
  }
  if (win && !win.isDestroyed()) {
    win.focus();
  } else {
    win = new BrowserWindow({
      width: 360,
      height: 600,
      frame: false,
      show: false,
      transparent: true,
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

    win.on('close', (e) => {
      e.preventDefault();
      win.hide();
    });

    win.on('blur', () => {
      win.hide();
    });

    win.webContents.on('will-navigate', (e, url) => {
      if (!/http:\/\/localhost|file:\/\/\//.test(url)) {
        e.preventDefault();
        shell.openExternal(url);
      }
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    process.env.ENV !== 'development'
      ? win.loadFile(path.join(__dirname, '../render/index.html'), {
        hash: '#/suspension/tarkovmini',
      })
      : win.loadURL(`http://localhost:${process.env.PORT}#/suspension/tarkovmini`);
  }
};
