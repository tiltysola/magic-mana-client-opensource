import chalk from 'chalk';
import dayjs from 'dayjs';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';

/* StopHandler: start */
const stopHandler: Array<() => void> = [];

const cleanUpServer = (eventType: string) => {
  if (eventType !== 'exit') {
    process.exit();
  } else {
    stopHandler.forEach((handle) => handle());
  }
};

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((eventType) => {
  process.on(eventType, cleanUpServer.bind(null, eventType));
});
/* StopHandler: end */

/* Logger: start */
const logPath = path.join(app.getPath('userData'), process.env.ENV !== 'development' ? 'logs' : 'logs-dev');
const logFileName = `${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.log`;

/* PathExist: start */
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}
/* PathExist: end */

/* LoggerFun: start */
const logger = fs.createWriteStream(path.join(logPath, logFileName));
const log = (level: string, color: string, ...msg: string[]) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  if (level !== 'INFO') {
    logger.write(`[${now}] [${level}] ${msg.join(' ')}\n`);
  }
  console.log(chalk`{grey [${now}]} {${color} [${level}]} ${msg.join(' ')}`);
};

const info = (...msg: any) => {
  log('INFO', 'green', ...msg);
};

const debug = (...msg: any) => {
  log('DEBUG', 'green', ...msg);
};

const error = (...msg: any) => {
  log('ERROR', 'red', ...msg);
};
/* LoggerFun: end */

/* LoggerInit: start */
log('SERVER', 'redBright', 'Starting logging...');

stopHandler.push(() => {
  log('SERVER', 'redBright', 'Stopping logging...');
  logger.close();
});
/* LoggerInit: end */

export default {
  info,
  debug,
  error,
};
/* Logger: end */
