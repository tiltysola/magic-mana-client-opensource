import { ipcMain } from 'electron';

import logger from '../utils/logger';

const on = (channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void) => {
  logger.info('[IpcMain]', `Registered \`${channel}\` channel & eventListener.`);
  ipcMain.on(channel, listener);
};

const handle = (channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any) => {
  logger.info('[IpcMain]', `Registered \`${channel}\` channel & handleListener.`);
  ipcMain.handle(channel, listener);
};

export default {
  on,
  handle,
};
