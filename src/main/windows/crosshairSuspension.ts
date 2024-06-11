import { BrowserWindow, screen, shell } from 'electron';
import path from 'path';

export let win: BrowserWindow;

setInterval(() => {
  if (win && !win.isDestroyed()) {
    win.setAlwaysOnTop(true, 'screen-saver', 1);
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }
}, 1000);

export default () => {
  if (win && !win.isDestroyed()) {
    win.focus();
  } else {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;

    win = new BrowserWindow({
      x: 0,
      y: 0,
      width,
      height,
      fullscreen: true,
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

    win.setIgnoreMouseEvents(true);

    if (process.platform === 'win32') {
      win.setSkipTaskbar(true);
    }

    win.once('ready-to-show', () => {
      win.show();
    });

    win.webContents.on('will-navigate', (e, url) => {
      if (!/http:\/\/localhost|file:\/\/\//.test(url)) {
        e.preventDefault();
        shell.openExternal(url);
      }
    });

    process.env.ENV !== 'development'
      ? win.loadFile(path.join(__dirname, '../render/index.html'), {
        hash: '#/suspension/crosshair',
      })
      : win.loadURL(`http://localhost:${process.env.PORT}#/suspension/crosshair`);
  }
};
