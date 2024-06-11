import { useEffect, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames';

import './style.less';

const Index = () => {
  const [tos, setTos] = useState('');
  const [eula, setEula] = useState(true);

  const handleAccept = () => {
    ipcRenderer.invoke('util_eula', true);
    setEula(true);
  };

  const handleRefuse = () => {
    ipcRenderer.send('control_shutdown');
  };

  useEffect(() => {
    ipcRenderer.invoke('util_eula').then((bl) => {
      axios.get('/api/tilty/config/markdown?key=client-tos').then((res) => {
        setTos(res.data.html);
        setEula(bl || false);
      });
    });
  }, []);

  return (
    <div
      className={classNames('eula', {
        active: !eula,
      })}
    >
      <div className="eula-title">
        <span>最终用户许可协议</span>
      </div>
      <div className="eula-content">
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: tos }} />
      </div>
      <div className="eula-button-group">
        <button className="eula-button" onClick={handleAccept}>
          同意
        </button>
        <button className="eula-button" onClick={handleRefuse}>
          拒绝并退出
        </button>
      </div>
    </div>
  );
};

export default Index;
