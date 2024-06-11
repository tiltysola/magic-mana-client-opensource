import { emitWithAck } from '../service/socket';
import ipcMain from './constructor';

export default () => {
  ipcMain.handle('socket_online', async () => {
    return await emitWithAck('/core/online');
  });
};
