import { useLocation } from 'react-router-dom';

import dayjs from 'dayjs';

import Error from '@/components/Error';

import './style.less';

const Index = () => {
  const location = useLocation();

  return (
    <Error
      data={{
        title: '发生异常！',
        desc: [
          {
            text: '迷途森林の兔提醒您：您访问的页面不存在！',
            type: 'primary',
          },
          {
            text: '错误代码: 404',
          },
          {
            text: `资源路径: ${location.pathname}`,
          },
          {
            text: `系统时间: ${dayjs().format('MMMM Do YYYY, h:mm:ss a')}`,
          },
        ],
        footer: 'Magic & Mana',
      }}
    />
  );
};

export default Index;
