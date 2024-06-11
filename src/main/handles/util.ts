import { app, dialog, screen, shell } from 'electron';

import storage from '../utils/storage';
import createWindow, { win } from '../windows/main';
import ipcMain from './constructor';

const util = () => {
  ipcMain.on('util_renderer_error', () => {
    dialog.showErrorBox('缇尔蒂的魔法小屋', '渲染端发生异常，正在尝试重启！');
    win.destroy();
    createWindow();
  });

  ipcMain.on('util_open_page', (e: any, page: string) => {
    shell.openExternal(page);
  });

  ipcMain.handle('util_platform', () => {
    return process.platform;
  });

  ipcMain.handle('util_cursor_position', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return { ...primaryDisplay.bounds, ...screen.getCursorScreenPoint() };
  });

  ipcMain.handle('util_forefix', (e, bl) => {
    if (bl !== undefined) {
      storage.set('enable_forefix', bl);
    } else {
      return storage.get('enable_forefix') || false;
    }
  });

  ipcMain.handle('util_startup', (e, bl) => {
    if (bl !== undefined) {
      storage.set('disble_startup', !bl);
      if (app.isPackaged && process.platform === 'win32') {
        if (bl) {
          app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: true,
            args: ['--openAsHidden'],
          });
        } else {
          app.setLoginItemSettings({
            openAtLogin: false,
          });
        }
      }
    } else {
      return !storage.get('disble_startup');
    }
  });

  ipcMain.handle('util_eula', (e, bl) => {
    if (bl !== undefined) {
      storage.set('eula', bl);
    } else {
      return storage.get('eula');
    }
  });
};

export default util;
