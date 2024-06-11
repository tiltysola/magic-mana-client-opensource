import { useEffect, useState } from 'react';

import { useTimeout } from 'ahooks';

import { useIpcRenderer } from '@/hooks';

import Background from '../Background';
import ControlBar from '../ControlBar';
import Eula from '../Eula';
import Loading from '../Loading';
import Main from '../Main';
import { message } from '../Message';
import TitleBar from '../TitleBar';

import './style.less';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ipcRenderer.send('control_resize_status');
  }, []);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  useIpcRenderer.on('control_resize_status', (e, bool: boolean) => {
    if (bool) {
      document.getElementById('root')?.classList.add('maximize');
    } else {
      document.getElementById('root')?.classList.remove('maximize');
    }
  });

  useIpcRenderer.on('reject_handler', (e, data: any) => {
    message.show({ content: data });
  });

  return (
    <div className="wrapper">
      <Loading loading={loading} />
      <Background />
      <TitleBar />
      <ControlBar />
      <Main />
      {!loading && (
        <Eula />
      )}
    </div>
  );
};

export default Index;
