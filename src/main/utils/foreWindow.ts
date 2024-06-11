import childProcess from 'child_process';
import path from 'path';

import { APP_PATH } from '../utils/constant';
import storage from './storage';

const foregroundWindowPath = path.join(APP_PATH, 'external/ForegroundWindow/ForegroundWindow/bin/Release/ForegroundWindow.exe');

let hWnd: string | null = null;

export const getForeWindow = (callback: () => void) => {
  const forefix = storage.get('enable_forefix');
  if (forefix) {
    const cp = childProcess.spawn(foregroundWindowPath, [
      '--get',
    ]);
    cp.stdout.on('data', (data) => {
      hWnd = Buffer.from(data).toString();
    });
    cp.on('exit', () => {
      callback();
    });
  } else {
    callback();
  }
};

export const setForeWindow = (callback: () => void) => {
  const forefix = storage.get('enable_forefix');
  if (forefix) {
    callback();
    if (hWnd) {
      childProcess.spawn(foregroundWindowPath, [
        '--set',
        hWnd,
      ]);
    }
  } else {
    callback();
  }
};
