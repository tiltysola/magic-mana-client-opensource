import logger from '../utils/logger';
import storage from '../utils/storage';
import createWindow, { win as crosshairWin } from '../windows/crosshairSuspension';
import { win } from '../windows/main';
import { win as trayWin } from '../windows/tray';
import ipcMain from './constructor';

export const enableSuspensionWindow = () => {
  logger.info('[Crosshair]', 'Crosshair suspension window enabled.');
  if (!crosshairWin || crosshairWin.isDestroyed()) {
    createWindow();
  }
  storage.set('crosshair_suspension', true);
  if (win && !win.isDestroyed()) {
    win.webContents.send('crosshair_suspension_status', true);
  }
  if (trayWin && !trayWin.isDestroyed()) {
    trayWin.webContents.send('crosshair_suspension_status', true);
  }
};

export const disableSuspensionWindow = () => {
  logger.info('[Crosshair]', 'Crosshair suspension window disabled.');
  if (crosshairWin && !crosshairWin.isDestroyed()) {
    crosshairWin.destroy();
  }
  storage.set('crosshair_suspension', false);
  if (win && !win.isDestroyed()) {
    win.webContents.send('crosshair_suspension_status', false);
  }
  if (trayWin && !trayWin.isDestroyed()) {
    trayWin.webContents.send('crosshair_suspension_status', false);
  }
};

const crosshair = () => {
  ipcMain.on('crosshair_suspension', () => {
    if (storage.get('crosshair_suspension')) {
      disableSuspensionWindow();
    } else {
      enableSuspensionWindow();
    }
  });

  ipcMain.on('crosshair_suspension_status', (e) => {
    e.reply('crosshair_suspension_status', storage.get('crosshair_suspension') || false);
  });

  ipcMain.handle('crosshair_config', (e, data) => {
    const crosshairConfig = storage.get('crosshair_config') || {};
    if (data) {
      const savedConfig = {
        ...crosshairConfig,
        ...data,
      };
      storage.set('crosshair_config', savedConfig);
      if (crosshairWin && !crosshairWin.isDestroyed()) {
        crosshairWin.webContents.send('crosshair_config', savedConfig);
      }
    } else {
      return storage.get('crosshair_config') || {};
    }
  });
};

export default crosshair;
