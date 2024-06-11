import { useEffect, useState } from 'react';

import classNames from 'classnames';

import Icon from '@/components/Icon';

import './style.less';

const Index = () => {
  const [hosts, setHosts] = useState(null);
  const [saved, setSaved] = useState(false);

  const fetchHosts = () => {
    ipcRenderer.invoke('hosts_get').then((res) => {
      setHosts(res);
    });
  };

  const handleHostsChange = (e: any) => {
    setHosts(e.target.value);
  };

  const handleSaveHosts = () => {
    ipcRenderer
      .invoke('hosts_set', hosts)
      .then(() => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 3000);
      });
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  return (
    <div className="hosts">
      <textarea className="hosts-textarea" value={hosts || ''} onChange={handleHostsChange} />
      <div className="hosts-button-control">
        <button
          className={classNames('hosts-button-control-confirm', {
            saved,
          })}
          onClick={handleSaveHosts}
        >
          <div className="hosts-button-control-confirm-box">
            <Icon type="icon-circle" />
            <span className="hosts-button-control-confirm-box-text">已保存！</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Index;
