import { useEffect, useState } from 'react';

import classNames from 'classnames';
import packageJson from 'package.json';

import { useIpcRenderer } from '@/hooks';

import './style.less';

const Index = () => {
  const [systemSuspensionActive, setSystemSuspensionActive] = useState(false);

  const handleOpenMain = () => {
    ipcRenderer.send('control_open_main');
  };

  const handleToggleSystemSuspension = () => {
    ipcRenderer.send('system_suspension');
  };

  const handleShutdown = () => {
    ipcRenderer.send('control_shutdown');
  };

  useEffect(() => {
    ipcRenderer.send('system_suspension_status');
  }, []);

  useEffect(() => {
    document.getElementById('root')?.classList.add('tray');

    return () => {
      document.getElementById('root')?.classList.remove('tray');
    };
  }, []);

  useIpcRenderer.on('system_suspension_status', (e, data) => {
    setSystemSuspensionActive(data);
  });

  return (
    <div className="tray">
      <div className="tray-icon">
        <span className="tray-icon-title">缇尔蒂的魔法小屋</span>
        <span className="tray-icon-version">Ver. {packageJson.version}</span>
      </div>
      <div className="tray-divider" />
      <ul className="tray-list">
        <li className="tray-item">
          <button className="tray-item-button" onClick={handleOpenMain}>
            进入魔法小屋
          </button>
        </li>
        <li className="tray-item">
          <button
            className={classNames('tray-item-button', {
              active: systemSuspensionActive,
            })}
            onClick={handleToggleSystemSuspension}
          >
            {systemSuspensionActive ? '关闭' : '开启'}系统悬浮窗
          </button>
        </li>
        <div className="tray-divider" />
        <li className="tray-item">
          <button className="tray-item-button" onClick={handleShutdown}>
            退出软件
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Index;
