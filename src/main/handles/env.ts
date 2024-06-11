import ipcMain from './constructor';

const env = () => {
  ipcMain.handle('env_get', () => {
    return JSON.stringify(process.env);
  });
};

export default env;
