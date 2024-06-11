import { BrowserWindow, screen, shell } from 'electron';
import path from 'path';

export let win: BrowserWindow;

export default () => {
  if (win && !win.isDestroyed()) {
    win.focus();
  } else {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width } = primaryDisplay.workAreaSize;

    win = new BrowserWindow({
      width: 260,
      height: 170,
      x: width - 280,
      y: 20,
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
        hash: '#/suspension/system',
      })
      : win.loadURL(`http://localhost:${process.env.PORT}#/suspension/system`);
  }
};
