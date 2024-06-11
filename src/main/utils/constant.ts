import { app } from 'electron';
import path from 'path';

export let APP_PATH = '';

export const DOC_PATH = app.getPath('documents');

if (process.env.ENV !== 'development') {
  if (process.platform === 'win32') {
    APP_PATH = path.join(app.getAppPath(), '../../');
  } else if (process.platform === 'darwin') {
    APP_PATH = path.join(app.getAppPath(), '../../');
  } else {
    APP_PATH = path.join(app.getAppPath(), '../../');
  }
} else if (process.platform === 'win32') {
  APP_PATH = path.join(app.getAppPath());
} else if (process.platform === 'darwin') {
  APP_PATH = path.join(app.getAppPath());
} else {
  APP_PATH = path.join(app.getAppPath());
}
