import { useEffect, useState } from 'react';

import classNames from 'classnames';

import './style.less';

const Index = () => {
  const [subListId, setSubListId] = useState<string>();
  const [env, setEnv] = useState<any>({});

  const fetchEnv = () => {
    ipcRenderer.invoke('env_get').then((res) => {
      setEnv(JSON.parse(res));
    });
  };

  const handleSubListIdChange = (id: string) => {
    setSubListId(id);
  };

  useEffect(() => {
    setSubListId(Object.keys(env)[0]);
  }, [env]);

  useEffect(() => {
    fetchEnv();
  }, []);

  return (
    <div className="env">
      <div className="env-root">
        <ul className="env-root-ul">
          {Object.keys(env)?.map((v) => (
            <li
              className={classNames('env-root-ul-li', {
                active: v === subListId,
              })}
              onClick={() => {
                handleSubListIdChange(v);
              }}
            >
              <span className="env-root-ul-li-span">{v}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="env-sub">
        <ul className="env-sub-ul">
          {subListId &&
            env[subListId].split(';').map((v: any) => (
              <li className="env-sub-ul-li">
                <span className="env-sub-ul-li-label">{v}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
