import logger from './logger';

const sessionValues: any = {};

/*
Saved keys:
socket: Socket;
tary: Tray;
*/

/* SessionSet: start */
const set = (key: string, value: any) => {
  logger.info('[Session]', `Value of \`${key}\` has been changed.`);
  sessionValues[key] = value;
};
/* SessionSet: end */

/* SessionGet: start */
const get = (key: string) => {
  return sessionValues[key];
};
/* SessionGet: start */

export default {
  set,
  get,
};
