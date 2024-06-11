import { formatBytes } from '@/utils';

import Icon from '@/components/Icon';

const list: any = [
  {
    id: 'brand',
    label: 'CPU型号',
  },
  {
    id: 'speed',
    label: '核心频率',
    render: (data: any) => {
      return `${data} Ghz`;
    },
  },
  {
    id: 'physicalCores',
    label: '核心数量',
    render: (data: any, record: any) => {
      return `${data} Cores / ${record?.cores} Threads`;
    },
  },
  {
    id: 'cache',
    label: '缓存',
    render: (data: any) => {
      return `L1: ${formatBytes(data?.l1d)} / ${formatBytes(data?.l1i)},
      L2: ${formatBytes(data?.l2)},
      L3: ${formatBytes(data?.l3)}`;
    },
  },
  {
    id: 'socket',
    label: '接口类型',
  },
  {
    id: 'flags',
    label: '指令集',
  },
  {
    id: 'manufacturer',
    label: '制造商',
  },
  {
    id: 'vendor',
    label: '供应商',
  },
  {
    id: 'virtualization',
    label: '虚拟化',
    render: (data: any) => {
      return data ? '是' : '否';
    },
  },
];

const Index = (props: { cpu: any }) => {
  const { cpu } = props;

  return (
    <ul className="system-sub-ul">
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-icon">
          <Icon className="system-root-ul-li-icon" type="icon-cpu" />
        </span>
        <span className="system-sub-ul-li-label">CPU</span>
      </li>
      {cpu &&
        list?.map((v: any) => (
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-label">{v.label}</span>:
            <span className="system-sub-ul-li-data">
              {v.render ? v.render(cpu[v.id], cpu) : cpu[v.id]}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Index;
