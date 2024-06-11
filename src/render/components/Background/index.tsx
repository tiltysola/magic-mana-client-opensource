import { useEffect, useRef, useState } from 'react';

import { useIpcRenderer } from '@/hooks';

import './style.less';

const Index = () => {
  const [background, setBackground] = useState('./background.png');
  const [position, setPosition] = useState([0, 0]);

  const backgroundRef = useRef<any>();
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      ipcRenderer.invoke('util_cursor_position').then((res) => {
        const { x, y, width, height } = res;
        const offsetX = (x - width / 2) / width;
        const offsetY = (y - height / 2) / height;
        setPosition([offsetX, offsetY]);
      });
    }, 1000 / 60);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    ipcRenderer.invoke('setting_bg_get').then((data) => {
      if (data) {
        setBackground(data.replace(/\\/g, '/'));
      }
    });
  }, []);

  useIpcRenderer.on('setting_bg_set', (e, data) => {
    if (data) {
      setBackground(data.replace(/\\/g, '/'));
    }
  });

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url('${background}')`,
        backgroundPosition: `${50 + position[0] * 2}% ${50 + position[1] * 20}%`,
      }}
      ref={backgroundRef}
    />
  );
};

export default Index;
