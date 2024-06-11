import { formatBytes } from '@/utils';

import Icon from '@/components/Icon';

const list: any = [
  {
    id: 'name',
    label: '硬盘名称',
  },
  {
    id: 'size',
    label: '空间大小',
    render: (data: any) => {
      return `${formatBytes(data)}`;
    },
  },
  {
    id: 'type',
    label: '硬盘類型',
  },
  {
    id: 'interfaceType',
    label: '接口類型',
  },
  {
    id: 'firmwareRevision',
    label: '固件版本',
  },
  {
    id: 'serialNum',
    label: '序列号',
  },
  {
    id: 'device',
    label: '挂载ID',
  },
  {
    id: 'bytesPerSector',
    label: '扇区字节数',
    render: (data: any) => {
      return `${formatBytes(data)}`;
    },
  },
  {
    id: 'sectorsPerTrack',
    label: '磁轨扇区数',
  },
  {
    id: 'tracksPerCylinder',
    label: '柱面磁轨数',
  },
  {
    id: 'totalCylinders',
    label: '柱面总数',
  },
  {
    id: 'totalTracks',
    label: '磁轨总数',
  },
  {
    id: 'totalSectors',
    label: '扇区总数',
  },
  {
    id: 'totalHeads',
    label: '磁头总数',
  },
  {
    id: 'smartStatus',
    label: '状态',
  },
  {
    id: 'vendor',
    label: '供应商',
  },
];

const Index = (props: { disk: any }) => {
  const { disk } = props;

  return (
    <ul className="system-sub-ul">
      {disk?.map((dsk: any, index: number) => (
        <>
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-icon">
              <Icon className="system-root-ul-li-icon" type="icon-filestorage" />
            </span>
            <span className="system-sub-ul-li-label">硬盘 {index + 1}</span>
          </li>
          {list?.map((v: any) => (
            <li className="system-sub-ul-li">
              <span className="system-sub-ul-li-label">{v.label}</span>:
              <span className="system-sub-ul-li-data">
                {v.render ? v.render(dsk[v.id], dsk) : dsk[v.id]}
              </span>
            </li>
          ))}
        </>
      ))}
    </ul>
  );
};

export default Index;
