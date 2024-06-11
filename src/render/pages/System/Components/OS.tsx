import Icon from '@/components/Icon';

const list: any = [
  {
    id: 'distro',
    label: '操作系统',
    render: (data: any, record: any) => {
      return `${data} (${record.arch}, build. ${record.build})`;
    },
  },
  {
    id: 'release',
    label: '发型版本',
  },
  {
    id: 'kernel',
    label: '内核版本',
  },
  {
    id: 'platform',
    label: '平台',
  },
  {
    id: 'hostname',
    label: '设备名称',
  },
  {
    id: 'serial',
    label: '序列号',
  },
  {
    id: 'uefi',
    label: 'UEFI',
    render: (data: any) => {
      return data ? '是' : '否';
    },
  },
];

const Index = (props: { os: any }) => {
  const { os } = props;

  return (
    <ul className="system-sub-ul">
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-icon">
          <Icon className="system-root-ul-li-icon" type="icon-disk" />
        </span>
        <span className="system-sub-ul-li-label">操作系统</span>
      </li>
      {os &&
        list?.map((v: any) => (
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-label">{v.label}</span>:
            <span className="system-sub-ul-li-data">
              {v.render ? v.render(os[v.id], os) : os[v.id]}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Index;
