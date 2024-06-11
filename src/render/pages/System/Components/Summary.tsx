import { formatBytes } from '@/utils';

import Icon from '@/components/Icon';

const Index = (props: { mb: any; os: any; cpu: any; memory: any; gpu: any; disk: any }) => {
  const { mb, os, cpu, memory, gpu, disk } = props;

  return (
    <ul className="system-sub-ul">
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-icon">
          <Icon className="system-root-ul-li-icon" type="icon-leaf" />
        </span>
        <span className="system-sub-ul-li-label">概述</span>
      </li>
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-label">主板制造商</span>:
        <span className="system-sub-ul-li-data">{mb?.manufacturer}</span>
      </li>
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-label">操作系统</span>:
        <span className="system-sub-ul-li-data">
          {os?.distro} ({os?.arch}, build. {os?.build})
        </span>
      </li>
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-label">CPU型号</span>:
        <span className="system-sub-ul-li-data">
          {cpu?.brand} ({cpu?.physicalCores} C / {cpu?.cores} T)
        </span>
      </li>
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-label">内存大小</span>:
        <span className="system-sub-ul-li-data">{formatBytes(memory?.total)}</span>
      </li>
      {gpu?.controllers?.map((controller: any, index: number) => (
        <li className="system-sub-ul-li">
          <span className="system-sub-ul-li-label">显卡 {index + 1}</span>:
          <span className="system-sub-ul-li-data">
            {controller.model} ({formatBytes(controller.vram * 1024 * 1024)})
          </span>
        </li>
      ))}
      {disk?.map((dsk: any, index: number) => (
        <li className="system-sub-ul-li">
          <span className="system-sub-ul-li-label">硬盘 {index + 1}</span>:
          <span className="system-sub-ul-li-data">
            [{dsk.type}] {dsk.name} ({formatBytes(dsk.size)})
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Index;
