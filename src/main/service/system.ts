import si from 'systeminformation';

const systemInfo: any = {};

const initialize = () => {
  si.system().then((r) => {
    systemInfo.mb = r;
  });
  si.cpu().then((r) => {
    systemInfo.cpu = r;
  });
  si.graphics().then((r) => {
    systemInfo.gpu = r;
  });
  si.osInfo().then((r) => {
    systemInfo.os = r;
  });
  si.diskLayout().then((r) => {
    systemInfo.disk = r;
  });
};

const getSystemInformation = () => {
  return new Promise((resolve, reject) => {
    const promiseSet = [
      new Promise((res, rej) => {
        si.mem()
          .then((r) => {
            systemInfo.ram = r;
            res(r);
          })
          .catch((err) => {
            rej(err);
          });
      }),
      new Promise((res, rej) => {
        si.currentLoad()
          .then((r) => {
            systemInfo.load = r;
            res(r);
          })
          .catch((err) => {
            rej(err);
          });
      }),
      new Promise((res, rej) => {
        si.networkStats()
          .then((r) => {
            systemInfo.nw = r;
            res(r);
          })
          .catch((err) => {
            rej(err);
          });
      }),
    ];
    Promise.all(promiseSet)
      .then(() => {
        resolve(systemInfo);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

initialize();

export { getSystemInformation };
