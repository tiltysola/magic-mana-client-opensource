import { formatBytes } from '@/utils';

import Icon from '@/components/Icon';

const controllerList: any = [
  {
    id: 'model',
    label: '型号',
  },
  {
    id: 'vram',
    label: '显存',
    render: (data: any) => {
      return formatBytes(data * 1024 * 1024);
    },
  },
  {
    id: 'bus',
    label: '总线类型',
  },
  {
    id: 'subDeviceId',
    label: '设备ID',
  },
  {
    id: 'vendor',
    label: '制造商',
  },
  {
    id: 'vramDynamic',
    label: '动态显存技术',
    render: (data: any) => {
      return data ? '支持' : '不支持';
    },
  },
];

const displayList: any = [
  {
    id: 'model',
    label: '型号',
  },
  {
    id: 'currentResX',
    label: '当前分辨率',
    render: (data: any, record: any) => {
      return `${data}px * ${record.currentResY}px (${record.currentRefreshRate} hz)`;
    },
  },
  {
    id: 'resolutionX',
    label: '最大分辨率',
    render: (data: any, record: any) => {
      return `${data}px * ${record.resolutionY}px`;
    },
  },
  {
    id: 'pixelDepth',
    label: '颜色深度',
  },
  {
    id: 'connection',
    label: '接入模式',
  },
  {
    id: 'main',
    label: '主显示器',
    render: (data: any) => {
      return data ? '是' : '否';
    },
  },
  {
    id: 'builtin',
    label: '内嵌显示器',
    render: (data: any) => {
      return data ? '是' : '否';
    },
  },
  {
    id: 'sizeX',
    label: '屏幕大小',
    render: (data: any, record: any) => {
      return `${data}cm * ${record.sizeY}cm`;
    },
  },
  {
    id: 'positionX',
    label: '显示器位置',
    render: (data: any, record: any) => {
      return `${data} (x.) ${record.positionY} (y.)`;
    },
  },
  {
    id: 'deviceName',
    label: '设备名称',
  },
  {
    id: 'vendor',
    label: '供应商',
  },
];

const Index = (props: { gpu: any }) => {
  const { gpu } = props;
  const { controllers, displays } = gpu || {};

  return (
    <ul className="system-sub-ul">
      {controllers?.map((controller: any, index: number) => (
        <>
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-icon">
              <Icon className="system-root-ul-li-icon" type="icon-videocard" />
            </span>
            <span className="system-sub-ul-li-label">显卡 {index + 1}</span>
          </li>
          {controllerList?.map((v: any) => (
            <li className="system-sub-ul-li">
              <span className="system-sub-ul-li-label">{v.label}</span>:
              <span className="system-sub-ul-li-data">
                {v.render ? v.render(controller[v.id], controller) : controller[v.id]}
              </span>
            </li>
          ))}
        </>
      ))}
      {displays?.map((display: any, index: number) => (
        <>
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-icon">
              <Icon className="system-root-ul-li-icon" type="icon-monitor" />
            </span>
            <span className="system-sub-ul-li-label">显示器 {index + 1}</span>
          </li>
          {displayList?.map((v: any) => (
            <li className="system-sub-ul-li">
              <span className="system-sub-ul-li-label">{v.label}</span>:
              <span className="system-sub-ul-li-data">
                {v.render ? v.render(display[v.id], display) : display[v.id]}
              </span>
            </li>
          ))}
        </>
      ))}
    </ul>
  );
};

export default Index;
