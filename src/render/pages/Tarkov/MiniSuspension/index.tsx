import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/Icon';

import './style.less';

const Index = () => {
  const [src] = useState('https://tarkov.mahoutsukai.cn/quicksearch');

  const iframeRef = useRef<any>();

  const handleReload = () => {
    const { contentWindow } = iframeRef.current;
    if (contentWindow) {
      contentWindow.location.reload();
    }
  };

  useEffect(() => {
    document.getElementById('root')?.classList.add('tarkov-mini-suspension');

    return () => {
      document.getElementById('root')?.classList.remove('tarkov-mini-suspension');
    };
  }, []);

  return (
    <div className="tarkov-mini">
      <div className="tarkov-mini-title-bar">
        <div className="tarkov-mini-title-bar-main">
          <div className="tarkov-mini-title-bar-main-title">
            <span>逃离塔科夫</span>
          </div>
        </div>
        <div className="tarkov-mini-title-bar-control">
          <span className="control-bar-button control-bar-minimize" onClick={handleReload}>
            <Icon type="icon-reload" />
          </span>
        </div>
      </div>
      <iframe src={src} ref={iframeRef} />
    </div>
  );
};

export default Index;
