import { useEffect, useState } from 'react';

import { useIpcRenderer } from '@/hooks';

import Icon from '@/components/Icon';

import './style.less';

const Index = () => {
  const [crosshairConfig, setCrosshairConfig] = useState<any>({});

  useEffect(() => {
    ipcRenderer.invoke('crosshair_config').then((data) => {
      setCrosshairConfig(data || {});
    });
  }, []);

  useEffect(() => {
    document.getElementById('root')?.classList.add('crosshair');

    return () => {
      document.getElementById('root')?.classList.remove('crosshair');
    };
  }, []);

  useIpcRenderer.on('crosshair_config', (e, data) => {
    setCrosshairConfig(data || {});
  });

  return (
    <div
      className="crosshair"
      style={{
        marginLeft: crosshairConfig.x,
        marginTop: crosshairConfig.y,
      }}
    >
      <Icon
        type="icon-crosshair"
        style={{
          color: crosshairConfig?.color,
          fontSize: `${crosshairConfig?.size}px`,
        }}
      />
    </div>
  );
};

export default Index;
