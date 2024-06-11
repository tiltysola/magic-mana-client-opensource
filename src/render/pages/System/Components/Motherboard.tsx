import Icon from '@/components/Icon';

const list: any = [
  {
    id: 'manufacturer',
    label: '制造商',
  },
  {
    id: 'model',
    label: '型号',
  },
  {
    id: 'version',
    label: '版本',
  },
  {
    id: 'serial',
    label: '序列号',
  },
  {
    id: 'uuid',
    label: 'UUID',
  },
];

const Index = (props: { mb: any }) => {
  const { mb } = props;

  return (
    <ul className="system-sub-ul">
      <li className="system-sub-ul-li">
        <span className="system-sub-ul-li-icon">
          <Icon className="system-root-ul-li-icon" type="icon-motherboard" />
        </span>
        <span className="system-sub-ul-li-label">主板</span>
      </li>
      {mb &&
        list?.map((v: any) => (
          <li className="system-sub-ul-li">
            <span className="system-sub-ul-li-label">{v.label}</span>:
            <span className="system-sub-ul-li-data">
              {v.render ? v.render(mb[v.id], mb) : mb[v.id]}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Index;
