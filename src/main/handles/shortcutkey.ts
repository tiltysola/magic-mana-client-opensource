import { registerCrosshairShortcutKey, registerShortcutKeyTarkov, registerTarkovMiniShortcutKey } from '../service/shortcutkey';
import storage from '../utils/storage';
import ipcMain from './constructor';

const shortcutkey = () => {
  ipcMain.on('shorcutkey_tarkov_set', (e, value) => {
    storage.set('shortcutTarkov', value);
    registerShortcutKeyTarkov(value);
  });

  ipcMain.on('shorcutkey_tarkov_mini_set', (e, value) => {
    storage.set('shortcutTarkovMini', value);
    registerTarkovMiniShortcutKey(value);
  });

  ipcMain.on('shorcutkey_crosshair_set', (e, value) => {
    storage.set('shortcutCrosshair', value);
    registerCrosshairShortcutKey(value);
  });

  ipcMain.handle('shorcutkey_tarkov_get', () => {
    return storage.get('shortcutTarkov') || 'CommandOrControl+ALT+1';
  });

  ipcMain.handle('shorcutkey_tarkov_mini_get', () => {
    return storage.get('shortcutTarkovMini') || 'CommandOrControl+ALT+2';
  });

  ipcMain.handle('shorcutkey_crosshair_get', () => {
    return storage.get('shortcutCrosshair') || 'CommandOrControl+ALT+0';
  });
};

export default shortcutkey;
