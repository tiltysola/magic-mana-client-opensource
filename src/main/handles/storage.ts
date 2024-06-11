import storage from '../utils/storage';
import { win } from '../windows/main';
import { win as tarkovWin } from '../windows/tarkovSuspension';
import ipcMain from './constructor';

const ipcStorage = () => {
  ipcMain.handle('storage_get', (e: any, key: string) => {
    return storage.get(key);
  });

  ipcMain.on('storage_set', (e: any, key: string, value: any) => {
    if (win && !win.isDestroyed()) {
      win.webContents.send('storage_set', key, value);
    }
    if (tarkovWin && !tarkovWin.isDestroyed()) {
      tarkovWin.webContents.send('storage_set', key, value);
    }
    return storage.set(key, value);
  });
};

export default ipcStorage;
