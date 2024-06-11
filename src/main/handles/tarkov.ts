import { app, dialog, screen } from 'electron';
import path from 'path';

import { disableTarkovLocation, enableTarkovLocation, setUnlinkStatus } from '../service/tarkov';
import storage from '../utils/storage';
import createWindow, { win } from '../windows/tarkovSuspension';
import ipcMain from './constructor';

const defaultScreenshotPath = path.join(app.getPath('documents'), '/Escape from Tarkov/Screenshots');

let fixedMode = false;
let savedSize = [429, 300];
let savedPosition = [0, 0];

setInterval(() => {
  if (win && !win.isDestroyed() && fixedMode) {
    win.setAlwaysOnTop(true, 'screen-saver', 1);
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }
}, 1000);

const tarkov = () => {
  ipcMain.on('tarkov_fixed', (e, bool: boolean) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth } = primaryDisplay.bounds;
    fixedMode = bool;
    if (bool) {
      win.setOpacity(0.8);
      win.setAlwaysOnTop(true);
      savedSize = win.getSize();
      win.setMinimumSize(240, 240);
      win.setSize(420, 600);
      savedPosition = win.getPosition();
      win.setPosition(screenWidth - 420, 0);
    } else {
      win.setOpacity(1);
      win.setAlwaysOnTop(false);
      win.setMinimumSize(1280, 720);
      win.setSize(savedSize[0], savedSize[1]);
      win.setPosition(savedPosition[0], savedPosition[1]);
    }
  });

  ipcMain.handle('tarkov_fixed_get', () => {
    return fixedMode;
  });

  ipcMain.on('tarkov_minimize', () => {
    win.minimize();
  });

  ipcMain.on('tarkov_resize', (e) => {
    const isMaximized = win.isMaximized();
    if (isMaximized) {
      win.unmaximize();
    } else {
      win.maximize();
    }
    e.reply('tarkov_resize_status', !isMaximized);
  });

  ipcMain.on('tarkov_resize_status', (e) => {
    const isMaximized = win.isMaximized();
    e.reply('tarkov_resize_status', isMaximized);
  });

  ipcMain.on('tarkov_open', () => {
    if (win && !win.isDestroyed()) {
      win.focus();
    } else {
      createWindow();
    }
  });

  ipcMain.on('tarkov_destroy', () => {
    win.hide();
  });

  ipcMain.on('tarkov_window_open', () => {
    if (!win || win.isDestroyed()) {
      createWindow();
    }
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });

  ipcMain.handle('tarkov_screenshot_path_dialog', () => {
    const _path = dialog.showOpenDialogSync({
      properties: ['openDirectory'],
    });
    return _path;
  });

  ipcMain.on('tarkov_screenshot_path_set', (e, data) => {
    storage.set('tsp_uri', data);
    enableTarkovLocation();
    e.reply('tarkov_screenshot_path_set', data || defaultScreenshotPath);
  });

  ipcMain.handle('tarkov_screenshot_path_get', () => {
    return storage.get('tsp_uri') || defaultScreenshotPath;
  });

  ipcMain.handle('tarkov_location', (e, bl) => {
    if (bl !== undefined) {
      storage.set('tarkov_location', bl);
      if (bl) {
        enableTarkovLocation();
      } else {
        disableTarkovLocation();
      }
    } else {
      return storage.get('tarkov_location');
    }
  });

  ipcMain.handle('tarkov_location_unlink', (e, bl) => {
    if (bl !== undefined) {
      storage.set('tarkov_location_unlink', bl);
      setUnlinkStatus(bl);
    } else {
      return storage.get('tarkov_location_unlink');
    }
  });
};

export default tarkov;
