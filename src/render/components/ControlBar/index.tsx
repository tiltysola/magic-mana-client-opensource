import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import { useIpcRenderer } from '@/hooks';

import Icon from '../Icon';

import './style.less';

const Index = () => {
  const [crosshairSuspensionActive, setCrosshairSuspensionActive] = useState(false);
  const [systemSuspensionActive, setSystemSuspensionActive] = useState(false);
  const [resizeStatus, setResizeStatus] = useState(false);

  const navigate = useNavigate();

  const handleToggleCrosshairSuspension = () => {
    ipcRenderer.send('crosshair_suspension');
  };

  const handleToggleSystemSuspension = () => {
    ipcRenderer.send('system_suspension');
  };

  const handleSetting = () => {
    navigate('/app/setting');
  };

  const handleMinimize = () => {
    ipcRenderer.send('control_minimize');
  };

  const handleResize = () => {
    ipcRenderer.send('control_resize');
  };

  const handleShutdown = () => {
    ipcRenderer.send('control_destroy_main');
  };

  useEffect(() => {
    ipcRenderer.send('crosshair_suspension_status');
    ipcRenderer.send('system_suspension_status');
    ipcRenderer.send('control_resize_status');
  }, []);

  useIpcRenderer.on('crosshair_suspension_status', (e, data) => {
    setCrosshairSuspensionActive(data);
  });

  useIpcRenderer.on('system_suspension_status', (e, data) => {
    setSystemSuspensionActive(data);
  });

  useIpcRenderer.on('control_resize_status', (e, res) => {
    setResizeStatus(res);
  });

  return (
    <div className="control-bar">
      <div className="control-bar-sub">
        <span
          className={classNames('control-bar-button', 'control-bar-crosshair', {
            active: crosshairSuspensionActive,
          })}
          onClick={handleToggleCrosshairSuspension}
        >
          <Icon type="icon-crosshair" />
        </span>
        <span
          className={classNames('control-bar-button', 'control-bar-analysis', {
            active: systemSuspensionActive,
          })}
          onClick={handleToggleSystemSuspension}
        >
          <Icon type="icon-analysis" />
        </span>
      </div>
      <div className="control-bar-main">
        <span className="control-bar-button control-bar-setting" onClick={handleSetting}>
          <Icon type="icon-setting1" />
        </span>
        <span className="control-bar-button control-bar-minimize" onClick={handleMinimize}>
          <Icon type="icon-minus" />
        </span>
        <span className="control-bar-button control-bar-resize" onClick={handleResize}>
          {resizeStatus ? <Icon type="icon-resize-min" /> : <Icon type="icon-resize-max" />}
        </span>
        <span className="control-bar-button control-bar-close" onClick={handleShutdown}>
          <Icon type="icon-close" />
        </span>
      </div>
    </div>
  );
};

export default Index;
