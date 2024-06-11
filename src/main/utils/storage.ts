import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import logger from './logger';

const configPath = path.join(app.getPath('userData'), process.env.ENV !== 'development' ? 'properties.json' : 'properties-dev.json');

/* StorageSet: start */
const set = (key: string, value: any) => {
  logger.info('[Storage]', `Value of \`${key}\` has been changed.`);
  try {
    const json = JSON.parse(fs.readFileSync(configPath).toString());
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        ...json,
        [key]: value,
      }),
    );
  } catch (err) {
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};
/* StorageSet: end */

/* StorageGet: start */
const get = (key: string) => {
  try {
    const json = JSON.parse(fs.readFileSync(configPath).toString());
    return json[key];
  } catch (err) {
    return null;
  }
};
/* StorageGet: start */

/* StorageClean: start */
const clean = () => {
  logger.info('[Storage]', 'Storage information has been cleaned.');
  fs.writeFileSync(configPath, JSON.stringify({}));
};
/* StorageClean: start */

export default {
  set,
  get,
  clean,
};
