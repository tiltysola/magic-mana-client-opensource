import { useEffect, useState } from 'react';

import packageJson from 'package.json';

import { useIpcRenderer } from '@/hooks';

import './style.less';

const Index = () => {
  const [online, setOnline] = useState(-1);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const handleUpdate = () => {
    ipcRenderer.send('updater_check');
  };

  useEffect(() => {
    ipcRenderer.invoke('socket_online').then((data) => {
      setOnline(data);
    });
    ipcRenderer.send('updater_available');
  }, []);

  useIpcRenderer.on('socket_online', (e, data) => {
    setOnline(data);
  });

  useIpcRenderer.on('updater_available', (e, data) => {
    setUpdateAvailable(data);
  });

  return (
    <div className="title-bar">
      <div className="title-bar-main">
        <div className="title-bar-main-gradient">
          <span className="title-bar-main-title">缇尔蒂的魔法小屋</span>
          <span className="title-bar-main-subtitle">Ver. {packageJson.version}</span>
          {online >= 0 && <span className="title-bar-main-online">（当前在线 {online}）</span>}
        </div>
      </div>
      {updateAvailable && (
        <div className="title-bar-updater" onClick={handleUpdate}>
          <span className="title-bar-updater-title">有新的更新可用！点击更新</span>
        </div>
      )}
    </div>
  );
};

export default Index;
