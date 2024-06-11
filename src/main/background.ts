import { app, BrowserWindow, globalShortcut } from 'electron';

import ipcControl from './handles/control';
import ipcCrosshair from './handles/crosshair';
import ipcEnv from './handles/env';
import ipcHosts from './handles/hosts';
import ipcNotification from './handles/notification';
import ipcSetting from './handles/setting';
import ipcShortcutKey from './handles/shortcutkey';
import ipcSocket from './handles/socket';
import ipcStorage from './handles/storage';
import ipcSystem from './handles/system';
import ipcTarkov from './handles/tarkov';
import ipcUtil from './handles/util';
import shortcutkey from './service/shortcutkey';
import socket from './service/socket';
import tarkov from './service/tarkov';
import tray from './service/tray';
import session from './utils/session';
import storage from './utils/storage';
import createCrosshairWindow from './windows/crosshairSuspension';
import createWindow, { win } from './windows/main';
import createSystemWindow from './windows/systemSuspension';

/* SingleInstance: ensure only one application at the same time. */
const singleInstance = app.requestSingleInstanceLock();

if (!singleInstance && process.env.ENV !== 'development') {
  app.quit();
}
/* SingleInstance: end */

/* Startup: if app is packaged, start at system startup. */
if (app.isPackaged) {
  /* Win32: start */
  if (process.platform === 'win32' && !storage.get('disble_startup')) {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      args: ['--openAsHidden'],
    });
  }
  /* Win32: end */
}
/* Startup: end */

/* AppReady: start */
app.whenReady().then(() => {
  /* OpenAsHidden: judge if the application started at system startup */
  if (process.argv.indexOf('--openAsHidden') < 0) {
    createWindow();
  }
  /* OpenAsHidden: end */

  /* AppActivated: start */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  /* AppActivated: end */

  /* SecondInstance: when second instance started, quit and focus the first instance. */
  app.on('second-instance', () => {
    if (win && !win.isDestroyed()) {
      win.focus();
    } else {
      createWindow();
    }
  });
  /* SecondInstance: end */

  /* IpcSection: communication with f2e. */
  ipcControl();
  // ipcProtection();
  // ipcProxy();
  ipcSystem();
  ipcHosts();
  ipcEnv();
  ipcSocket();
  ipcCrosshair();
  ipcTarkov();
  ipcSetting();
  ipcShortcutKey();
  ipcUtil();
  ipcNotification();
  ipcStorage();
  /* IpcSection: end */

  /* SystemTray: start */
  if (process.platform !== 'linux') {
    tray();
  }
  /* SystemTray: end */

  /* ShortcutKey: start */
  shortcutkey();
  /* ShortcutKey: end */

  /* Tarkov: start */
  tarkov();
  /* Tarkov: end */

  /* SocketIO: start */
  socket();
  /* SocketIO: end */

  /* StartupWindows: start */
  if (storage.get('crosshair_suspension')) {
    createCrosshairWindow();
  }
  if (storage.get('system_suspension')) {
    createSystemWindow();
  }
  /* StartupWindows: end */
});
/* AppReady: end */

/* WindowAllClosed: when all windows and trays are closed, quit app. */
app.on('window-all-closed', () => {
  /* !Darwin: start */
  if (process.platform !== 'darwin') {
    if (!session.get('tray') || session.get('tray').isDestroyed()) {
      app.quit();
    }
  }
  /* !Darwin: end */
});
/* WindowAllClosed: end */

/* WillQuit: start */
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
/* WillQuit: end */
