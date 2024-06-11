import { useEffect, useState } from 'react';

import axios from 'axios';

import './style.less';

const Index = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    axios.get('/api/tilty/config/markdown?key=client-announce').then((res) => {
      const { data } = res;
      setMarkdown(data.html);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <img className="dashboard-header-logo" src="./logo_v2.png" />
        <span className="dashboard-header-info">缇尔蒂的魔法小屋</span>
      </div>
      <div className="dashboard-main">
        {/* eslint-disable-next-line */}
        <div className="dashboard-main-announce" dangerouslySetInnerHTML={{ __html: markdown?.replace(/<a/g, '<a target="_blank"') }} />
      </div>
    </div>
  );
};

export default Index;
