import { getSystemInformation } from '../service/system';
import logger from '../utils/logger';
import storage from '../utils/storage';
import { win } from '../windows/main';
import createWindow, { win as systemWin } from '../windows/systemSuspension';
import { win as trayWin } from '../windows/tray';
import ipcMain from './constructor';

export const enableSuspensionWindow = () => {
  logger.info('[System]', 'System suspension window enabled.');
  if (!systemWin || systemWin.isDestroyed()) {
    createWindow();
  }
  storage.set('system_suspension', true);
  if (win && !win.isDestroyed()) {
    win.webContents.send('system_suspension_status', true);
  }
  if (trayWin && !trayWin.isDestroyed()) {
    trayWin.webContents.send('system_suspension_status', true);
  }
};

export const disableSuspensionWindow = () => {
  logger.info('[System]', 'System suspension window disabled.');
  if (systemWin && !systemWin.isDestroyed()) {
    systemWin.destroy();
  }
  storage.set('system_suspension', false);
  if (win && !win.isDestroyed()) {
    win.webContents.send('system_suspension_status', false);
  }
  if (trayWin && !trayWin.isDestroyed()) {
    trayWin.webContents.send('system_suspension_status', false);
  }
};

const system = () => {
  ipcMain.on('system_info', async (e) => {
    getSystemInformation().then((res) => {
      e.reply('system_info', res);
    });
  });

  ipcMain.on('system_suspension', () => {
    if (storage.get('system_suspension')) {
      disableSuspensionWindow();
    } else {
      enableSuspensionWindow();
    }
  });

  ipcMain.on('system_suspension_status', (e) => {
    e.reply('system_suspension_status', storage.get('system_suspension') || false);
  });
};

export default system;
