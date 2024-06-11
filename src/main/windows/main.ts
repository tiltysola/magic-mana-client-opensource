import { BrowserWindow, shell } from 'electron';
import path from 'path';

import storage from '../utils/storage';

export let win: BrowserWindow;

export default () => {
  if (win && !win.isDestroyed()) {
    win.focus();
  } else {
    win = new BrowserWindow({
      width: storage.get('main_width') || 1440,
      height: storage.get('main_height') || 900,
      minWidth: 1200,
      minHeight: 680,
      frame: false,
      resizable: true,
      show: false,
      transparent: true,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, './preload.js'),
        webSecurity: false,
        devTools: process.env.ENV === 'development',
      },
    });

    win.once('ready-to-show', () => {
      win.show();
    });

    win.on('resize', () => {
      if (process.platform !== 'win32' && process.platform !== 'darwin') {
        const { width, height } = win.getBounds();
        storage.set('main_width', width);
        storage.set('main_height', height);
      }
    });

    win.on('resized', () => {
      const { width, height } = win.getBounds();
      storage.set('main_width', width);
      storage.set('main_height', height);
    });

    win.on('move', () => {
      if (process.platform !== 'win32' && process.platform !== 'darwin') {
        const isMaximized = win.isMaximized();
        win.webContents.send('control_resize_status', isMaximized);
      }
    });

    win.on('moved', () => {
      const isMaximized = win.isMaximized();
      win.webContents.send('control_resize_status', isMaximized);
    });

    win.on('maximize', () => {
      win.webContents.send('control_resize_status', true);
      const { width, height } = win.getBounds();
      storage.set('main_width', width);
      storage.set('main_height', height);
    });

    win.on('unmaximize', () => {
      win.webContents.send('control_resize_status', false);
      const { width, height } = win.getBounds();
      storage.set('main_width', width);
      storage.set('main_height', height);
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
      ? win.loadFile(path.join(__dirname, '../render/index.html'))
      : win.loadURL(`http://localhost:${process.env.PORT}`);
  }
};
