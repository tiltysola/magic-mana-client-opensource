import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useIpcRenderer } from '@/hooks';

import Icon from '@/components/Icon';

import Cpu from './Components/Cpu';
import Disk from './Components/Disk';
import Gpu from './Components/Gpu';
import Memory from './Components/Memory';
import Motherboard from './Components/Motherboard';
import OS from './Components/OS';
import Summary from './Components/Summary';

import './style.less';

const rootList = [
  {
    id: 'summary',
    label: '概述',
    icon: 'icon-leaf',
  },
  {
    id: 'mb',
    label: '主板',
    icon: 'icon-motherboard',
  },
  {
    id: 'os',
    label: '操作系统',
    icon: 'icon-disk',
  },
  {
    id: 'cpu',
    label: 'CPU',
    icon: 'icon-cpu',
  },
  {
    id: 'ram',
    label: '内存',
    icon: 'icon-ram',
  },
  {
    id: 'gpu',
    label: '显卡',
    icon: 'icon-videocard',
  },
  {
    id: 'disk',
    label: '硬盘',
    icon: 'icon-filestorage',
  },
];

const Index = () => {
  const [subListId, setSubListId] = useState('summary');
  const [systemInfomation, setSystemInformation] = useState<any>();

  const handleSubListIdChange = (id: string) => {
    setSubListId(id);
  };

  useEffect(() => {
    ipcRenderer.send('system_info');
  }, []);

  useIpcRenderer.on('system_info', (e, data) => {
    setSystemInformation(data);
  });

  return (
    <div className="system">
      <div className="system-root">
        <ul className="system-root-ul">
          {rootList?.map((v) => (
            <li
              className={classNames('system-root-ul-li', {
                active: v.id === subListId,
              })}
              onClick={() => {
                handleSubListIdChange(v.id);
              }}
            >
              <Icon className="system-root-ul-li-icon" type={v.icon} />
              <span className="system-root-ul-li-span">{v.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="system-sub">
        {systemInfomation ? (
          <>
            {subListId === 'summary' && (
              <Summary
                mb={systemInfomation?.mb}
                os={systemInfomation?.os}
                cpu={systemInfomation?.cpu}
                memory={systemInfomation?.ram}
                gpu={systemInfomation?.gpu}
                disk={systemInfomation?.disk}
              />
            )}
            {subListId === 'mb' && <Motherboard mb={systemInfomation?.mb} />}
            {subListId === 'os' && <OS os={systemInfomation?.os} />}
            {subListId === 'cpu' && <Cpu cpu={systemInfomation?.cpu} />}
            {subListId === 'ram' && <Memory memory={systemInfomation?.ram} />}
            {subListId === 'gpu' && <Gpu gpu={systemInfomation?.gpu} />}
            {subListId === 'disk' && <Disk disk={systemInfomation?.disk} />}
          </>
        ) : (
          <div className="system-sub-loading">
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
