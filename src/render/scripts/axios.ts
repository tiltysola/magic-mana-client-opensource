import axios from 'axios';

axios.interceptors.request.use(async (_cfg) => {
  const cfg = _cfg;
  if (cfg.url?.substring(0, 1) === '/') {
    cfg.url = cfg.url.substring(1);
    cfg.url = `https://tilty.mahoutsukai.cn/${cfg.url}`;
  }
  return cfg;
});

axios.interceptors.response.use(
  (res: any) => {
    if (!res.data.code || res.data.code === 200) {
      return res.data;
    } else if (res.data.extra) {
      const errorMsg = `${res.data.code}: ${res.data.extra}`;
      return Promise.reject(errorMsg);
    } else {
      const errorMsg = `${res.data.code}: ${res.data.errorMessage}`;
      return Promise.reject(errorMsg);
    }
  },
  (err) => {
    return Promise.reject(err);
  },
);
