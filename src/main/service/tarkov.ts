import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import logger from '../utils/logger';
import storage from '../utils/storage';
import { win } from '../windows/tarkovSuspension';

const defaultScreenshotPath = path.join(app.getPath('documents'), '/Escape from Tarkov/Screenshots');

let watcher: fs.FSWatcher;

let autoUnlinkFile = false;

export const enableTarkovLocation = () => {
  if (watcher) {
    try {
      watcher.close();
    } catch (err) {
      logger.error(err);
    }
  }
  const screenshotPath = storage.get('tsp_uri') as string || defaultScreenshotPath;
  watcher = fs.watch(screenshotPath, (eventType, filename) => {
    if (eventType === 'change' && filename) {
      logger.debug(path.join(screenshotPath, filename));
      if (win && !win.isDestroyed()) {
        win.webContents.send('tarkov_location_update', filename);
      }
      if (autoUnlinkFile) {
        fs.promises.unlink(path.join(screenshotPath, filename));
      }
    }
  });
};

export const disableTarkovLocation = () => {
  if (watcher) {
    try {
      watcher.close();
    } catch (err) {
      logger.error(err);
    }
  }
};

export const setUnlinkStatus = (status: boolean) => {
  autoUnlinkFile = status;
};

export default () => {
  if (storage.get('tarkov_location')) {
    enableTarkovLocation();
  }
  if (storage.get('tarkov_location_unlink')) {
    autoUnlinkFile = true;
  }
};
