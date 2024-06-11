import packageJson from 'package.json';
import { io } from 'socket.io-client';

import logger from '../utils/logger';
import session from '../utils/session';
import storage from '../utils/storage';
import { win } from '../windows/main';

export let emitWithAck: any;

export default () => {
  /* Initialization: start */
  const client = io('https://tilty.mahoutsukai.cn', {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionDelayMax: 60000,
    timeout: 60000,
  });
  session.set('socket', client);
  /* Initialization: end */

  /* EmitAck: start */
  emitWithAck = (event: string, data?: any) => {
    return new Promise((resolve, reject) => {
      client.emitWithAck(event, data).then((res) => {
        if (typeof res === 'object') {
          if (!res.code || res.code === 200) {
            resolve(res.data);
          } else if (res.extra) {
            const errorMsg = `${res.code}: ${res.extra} (${event})`;
            reject(errorMsg);
          } else {
            const errorMsg = `${res.code}: ${res.errorMessage} (${event})`;
            reject(errorMsg);
          }
        } else {
          reject(`404: 事件 ${event} 未找到`);
        }
      }).catch((err) => {
        reject(`${err.toString()} (${event})`);
      });
    }).catch((err) => {
      logger.error(err);
      if (win && !win.isDestroyed()) {
        win.webContents.send('reject_handler', err);
      }
    });
  };
  /* EmitAck: end */

  /* Connected: start */
  client.on('connect', async () => {
    logger.info('[SocketIO]', 'Connected!');
    emitWithAck('/core/initial', {
      channel: 'client',
      version: process.env.ENV !== 'development' ? packageJson.version : `${packageJson.version}-dev`,
    });
  });
  /* Connected: end */

  /* Disconnected: start */
  client.on('disconnect', () => {
    logger.info('[SocketIO]', 'Disconnected!');
  });
  /* Disconnected: end */

  /* ConnectError: start */
  client.on('connect_error', (err) => {
    logger.error('[SocketIO]', `Connect error, ${err.toString()}!`);
  });
  /* ConnectError: end */

  /* EventOnline: start */
  client.on('/core/online', ({ data }) => {
    if (win && !win.isDestroyed()) {
      win.webContents.send('socket_online', data);
    }
  });
  /* EventOnline: end */
};
