import { dialog } from 'electron';

import storage from '../utils/storage';
import ipcMain from './constructor';

const setting = () => {
  ipcMain.handle('setting_bg_dialog', () => {
    const file = dialog.showOpenDialogSync({
      title: '选择图片',
      filters: [
        {
          name: '图片格式',
          extensions: ['jpg', 'jpeg', 'png', 'bmp'],
        },
      ],
    });
    return file;
  });

  ipcMain.on('setting_bg_set', (e, data) => {
    storage.set('bg_uri', data);
    e.reply('setting_bg_set', data || './background.png');
  });

  ipcMain.handle('setting_bg_get', () => {
    return storage.get('bg_uri') || './background.png';
  });

  ipcMain.handle('setting_delete_properties', () => {
    return storage.clean();
  });
};

export default setting;
