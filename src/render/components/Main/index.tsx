import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import Icon from '@/components/Icon';

import UserPanel from '../UserPanel';

import './style.less';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      icon: 'icon-dashboard',
      title: '仪表盘',
      router: '/app/dashboard',
      visible: true,
    },
    {
      icon: 'icon-desktop',
      title: '硬件信息',
      router: '/app/system',
      visible: true,
    },
    {
      icon: 'icon-embed2',
      title: '环境变量',
      router: '/app/env',
      visible: true,
    },
    {
      icon: 'icon-dns',
      title: 'HOSTS',
      router: '/app/hosts',
      visible: true,
    },
    {
      icon: 'icon-ziyuanjrit',
      title: '逃离塔科夫',
      router: '/app/tarkov',
      visible: true,
    },
  ];

  return (
    <div className="main">
      <div className="main-panel">
        <UserPanel />
        {menu.map(
          (v, i) =>
            v.visible && (
              <div
                className={classNames('main-panel-item', {
                  active: location.pathname.includes(v.router),
                })}
                onClick={() => {
                  if (v.router) {
                    navigate(v.router);
                  }
                }}
                key={`main-panel-item-${i}`}
              >
                <span className="main-panel-item-icon">
                  <Icon type={v.icon} />
                </span>
                <span className="main-panel-item-title">{v.title}</span>
              </div>
            ),
        )}
        <div
          className="main-panel-item"
          onClick={() => {
            window.open('https://tilty.mahoutsukai.cn/');
          }}
        >
          <span className="main-panel-item-icon">
            <Icon type="icon-website" />
          </span>
          <span className="main-panel-item-title">缇尔蒂</span>
        </div>
      </div>
      <div className="main-desc">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
