import { pushNotification } from '../service/notification';
import ipcMain from './constructor';

const notification = () => {
  ipcMain.on('notification', (e, value) => {
    pushNotification(value);
  });
};

export default notification;
