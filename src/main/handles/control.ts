import { app } from 'electron';

import createWindow, { win } from '../windows/main';
import ipcMain from './constructor';

const control = () => {
  ipcMain.on('control_minimize', () => {
    win.minimize();
  });

  ipcMain.on('control_resize', (e) => {
    const isMaximized = win.isMaximized();
    if (isMaximized) {
      win.unmaximize();
    } else {
      win.maximize();
    }
    e.reply('control_resize_status', !isMaximized);
  });

  ipcMain.on('control_resize_status', (e) => {
    const isMaximized = win.isMaximized();
    e.reply('control_resize_status', isMaximized);
  });

  ipcMain.on('control_open_main', () => {
    if (win && !win.isDestroyed()) {
      win.focus();
    } else {
      createWindow();
    }
  });

  ipcMain.on('control_destroy_main', () => {
    if (process.platform !== 'linux') {
      win.destroy();
    } else {
      app.quit();
    }
  });

  ipcMain.on('control_shutdown', () => {
    app.quit();
    app.exit();
  });
};

export default control;
