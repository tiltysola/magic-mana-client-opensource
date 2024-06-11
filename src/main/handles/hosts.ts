import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import sudo from 'sudo-prompt';

import logger from '../utils/logger';
import ipcMain from './constructor';

const tempHostsPath = path.join(app.getPath('userData'), 'hosts');
let hostsPath = '/private/etc/hosts';

if (process.platform === 'win32') {
  hostsPath = 'C:/Windows/System32/drivers/etc/hosts';
} else if (process.platform === 'darwin') {
  hostsPath = '/private/etc/hosts';
}

const hosts = () => {
  ipcMain.handle('hosts_get', () => {
    return fs.readFileSync(hostsPath).toString();
  });

  ipcMain.handle('hosts_set', (e, data) => {
    if (process.platform === 'win32') {
      return new Promise((res, rej) => {
        try {
          fs.writeFileSync(tempHostsPath, data);
          sudo.exec(
            `copy "${tempHostsPath}" "${hostsPath}"`,
            {
              name: 'TiltyHelper',
            },
            (err) => {
              if (err) rej(err);
              res(0);
            },
          );
          logger.info('[Hosts]', 'Host saved!');
        } catch (err) {
          rej(err);
          logger.info('[Hosts]', 'Host save failed!');
        }
      });
    } else if (process.platform === 'darwin') {
      return new Promise((res, rej) => {
        try {
          fs.writeFileSync(tempHostsPath, data);
          sudo.exec(
            `cp "${tempHostsPath}" "${hostsPath}"`,
            {
              name: 'TiltyHelper',
            },
            (err) => {
              if (err) rej(err);
              res(0);
            },
          );
          logger.info('[Hosts]', 'Host saved!');
        } catch (err) {
          rej(err);
          logger.info('[Hosts]', 'Host save failed!');
        }
      });
    }
  });
};

export default hosts;
