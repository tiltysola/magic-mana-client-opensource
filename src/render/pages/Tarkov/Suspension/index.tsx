import { useEffect, useRef, useState } from 'react';

import { useInterval } from 'ahooks';

import { useIpcRenderer } from '@/hooks';

import Icon from '@/components/Icon';

import './style.less';

const navList = [
  {
    title: '首页',
    nav: 'https://tarkov.mahoutsukai.cn/',
  },
  {
    title: '官方WIKI',
    nav: 'https://escapefromtarkov.fandom.com/zh/wiki/',
  },
  {
    title: '物品查询',
    nav: 'https://tarkov.mahoutsukai.cn/app/itemsquery',
  },
  {
    title: '任务一览',
    nav: 'https://tarkov.mahoutsukai.cn/app/taskslist',
  },
  {
    title: '以物换物',
    nav: 'https://tarkov.mahoutsukai.cn/app/bartersquery',
  },
  {
    title: '保留物品',
    nav: 'https://tarkov.mahoutsukai.cn/app/itemskeep',
  },
  {
    title: '藏身处利润',
    nav: 'https://tarkov.mahoutsukai.cn/app/hideoutcalculator',
  },
  {
    title: '倒货查询',
    nav: 'https://tarkov.mahoutsukai.cn/app/itemstraderdiff',
  },
  {
    title: '弹药穿透',
    nav: 'https://tarkov.mahoutsukai.cn/app/ammotable',
  },
  {
    title: '互动地图 (旧)',
    nav: 'https://tarkov.mahoutsukai.cn/app/interactmap',
  },
  {
    title: '互动地图',
    nav: 'https://tarkov.mahoutsukai.cn/interactive',
  },
];

const Index = () => {
  const [src, setSrc] = useState('https://tarkov.mahoutsukai.cn/interactive');
  const [resizeStatus, setResizeStatus] = useState(false);
  const [fixedMode, setFixedMode] = useState(false);

  const iframeRef = useRef<any>();

  const handleFixed = () => {
    if (!fixedMode) {
      setSrc('https://tarkov.mahoutsukai.cn/interactive');
    }
    ipcRenderer.send('tarkov_fixed', !fixedMode);
    setFixedMode(!fixedMode);
  };

  const handleBack = () => {
    const { contentWindow } = iframeRef.current;
    if (contentWindow) {
      contentWindow.history.back();
    }
  };

  const handleForward = () => {
    const { contentWindow } = iframeRef.current;
    if (contentWindow) {
      contentWindow.history.forward();
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleMinimize = () => {
    ipcRenderer.send('tarkov_minimize');
  };

  const handleResize = () => {
    ipcRenderer.send('tarkov_resize');
  };

  const handleShutdown = () => {
    ipcRenderer.send('tarkov_destroy');
  };

  useEffect(() => {
    document.getElementById('root')?.classList.add('tarkov-suspension');

    return () => {
      document.getElementById('root')?.classList.remove('tarkov-suspension');
    };
  }, []);

  useEffect(() => {
    ipcRenderer.invoke('tarkov_fixed_get').then((res) => {
      setFixedMode(res);
    });
  }, []);

  useEffect(() => {
    ipcRenderer.send('tarkov_resize_status');
  }, []);

  useInterval(() => {
    const { contentWindow } = iframeRef.current || {};
    if (contentWindow) {
      const ads = [
        '.top-ads-container',
        '.bottom-ads-container',
        '#mixed-content-footer',
        '.notifications-placeholder',
        '.global-navigation',
        '.global-footer',
      ];
      const mct = contentWindow.document.querySelector('.main-container');
      const fsh = contentWindow.document.querySelector('.fandom-sticky-header');
      ads.forEach((v) => {
        const ele = contentWindow.document.querySelector(v);
        ele && (ele.style.display = 'none');
      });
      if (mct) {
        mct.style.marginLeft = 0;
        mct.style.width = '100%';
      }
      if (fsh) {
        fsh.style.left = 0;
      }
      const divs = contentWindow.document.querySelectorAll('div');
      divs.forEach((div: any) => {
        if (div.dataset?.trackingOptInAccept) {
          div.click();
        }
      });
    }
  }, 100);

  useIpcRenderer.on('tarkov_resize_status', (e, res) => {
    setResizeStatus(res);
  });

  useIpcRenderer.on('tarkov_location_update', (e, filename) => {
    iframeRef.current?.contentWindow.interactUpdateLocation?.(filename);
  });

  return (
    <div className="tarkov">
      <div className="tarkov-title-bar">
        <div className="tarkov-title-bar-main">
          <div className="tarkov-title-bar-main-title">
            <span>逃离塔科夫</span>
          </div>
          {!fixedMode && (
            <ul className="tarkov-title-bar-main-nav">
              {navList?.map((v) => (
                <li
                  onClick={() => {
                    setSrc(v.nav);
                  }}
                >
                  {v.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="tarkov-title-bar-control">
          <span className="control-bar-button control-bar-minimize" onClick={handleFixed}>
            <Icon type="icon-circle" />
          </span>
          {!fixedMode && (
            <span className="control-bar-button control-bar-minimize" onClick={handleBack}>
              <Icon type="icon-Chevron-Left" />
            </span>
          )}
          {!fixedMode && (
            <span className="control-bar-button control-bar-minimize" onClick={handleForward}>
              <Icon type="icon-Chevron-Right" />
            </span>
          )}
          {!fixedMode && (
            <span className="control-bar-button control-bar-minimize" onClick={handleReload}>
              <Icon type="icon-reload" />
            </span>
          )}
          {!fixedMode && (
            <span className="control-bar-button control-bar-minimize" onClick={handleMinimize}>
              <Icon type="icon-minus" />
            </span>
          )}
          {!fixedMode && (
            <span className="control-bar-button control-bar-resize" onClick={handleResize}>
              {resizeStatus ? <Icon type="icon-resize-min" /> : <Icon type="icon-resize-max" />}
            </span>
          )}
          <span className="control-bar-button control-bar-close" onClick={handleShutdown}>
            <Icon type="icon-close" />
          </span>
        </div>
      </div>
      <iframe src={`${src}?client=true`} ref={iframeRef} />
    </div>
  );
};

export default Index;
