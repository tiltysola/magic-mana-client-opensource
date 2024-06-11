import { useEffect, useState } from 'react';

import { useInterval } from 'ahooks';

import { useIpcRenderer } from '@/hooks';
import { formatBytes } from '@/utils';

import './style.less';

const Index = () => {
  const [systemInfomation, setSystemInformation] = useState<any>();

  const reduce = (target: any, varible: string) => {
    return target?.reduce((sum: number, current: any) => {
      return sum + Math.round(current[varible]);
    }, 0);
  };

  useEffect(() => {
    document.getElementById('root')?.classList.add('suspension');

    return () => {
      document.getElementById('root')?.classList.remove('suspension');
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send('system_info');
  }, []);

  useInterval(() => {
    ipcRenderer.send('system_info');
  }, 3000);

  useIpcRenderer.on('system_info', (e, data) => {
    setSystemInformation(data);
  });

  return (
    <div className="system-suspension">
      {systemInfomation && (
        <>
          <div className="system-suspension-item">
            <span className="system-suspension-item-label">CPU占用: </span>
            <span className="system-suspension-item-value">
              {(systemInfomation?.load?.currentLoad).toFixed(2)}%
            </span>
          </div>
          <div className="system-suspension-item">
            <span className="system-suspension-item-label">内存占用: </span>
            <span className="system-suspension-item-value">
              {((systemInfomation?.ram?.active / systemInfomation?.ram?.total) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="system-suspension-item">
            <span className="system-suspension-item-label">下载速度: </span>
            <span className="system-suspension-item-value">
              {formatBytes(reduce(systemInfomation?.nw, 'rx_sec'))}/s
            </span>
          </div>
          <div className="system-suspension-item">
            <span className="system-suspension-item-label">上传速度: </span>
            <span className="system-suspension-item-value">
              {formatBytes(reduce(systemInfomation?.nw, 'tx_sec'))}/s
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
