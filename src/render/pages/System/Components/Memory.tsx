import { formatBytes } from '@/utils';

import Icon from '@/components/Icon';

const list: any = [
  {
    id: 'total',
    label: '内存大小',
    render: (data: any) => {
      return formatBytes(data);
    },
  },
  {
    id: 'free',
    label: '空闲内存',
    render: (data: any, record: any) => {
      return `${formatBytes(data)} [${formatBytes(record?.available)} (available.)]`;
    },
  },
  {
    id: 'used',
    label: '已用内存',
    render: (data: any, record: any) => {
      return `${formatBytes(data)} [${formatBytes(record?.active)} (active.)]`;
    },
  },
  {
    id: 'buffcache',
    label: '缓冲区緩存',
    render: (data: any) => {
      return formatBytes(data);
    },
  },
  {
    id: 'swaptotal',
    label: '交换区内存大小',
    render: (data: any) => {
      return formatBytes(data);
    },
  },
  {
    id: 'swapfree',
    label: '交换区空闲内存',
    render: (data: any) => {
      return formatBytes(data);
    },
  },
  {
    id: 'swapused',
    label: '交换区已用内存',
    render: (data: any) => {
      return formatBytes(data);
    },
  },
];

const Index = (props: { memory: any }) => {
  const { memory } = props;

  return (
    <ul className="system-sub-ul">
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-icon">
          <Icon className="system-root-ul-li-icon" type="icon-ram" />
        </span>
        <span className="system-sub-ul-li-label">内存</span>
      </li>
      {memory &&
        list?.map((v: any) => (
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-label">{v.label}</span>:
            <span className="system-sub-ul-li-data">
              {v.render ? v.render(memory[v.id], memory) : memory[v.id]}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Index;
