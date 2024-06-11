import { ReactChild } from 'react';

import './style.less';

interface ErrorDataProp {
  data: {
    title: string;
    desc: Array<{
      text: string | ReactChild;
      type?: 'normal' | 'primary';
    }>;
    footer?: string;
  };
}

const Index = ({ data }: ErrorDataProp) => {
  return (
    <div className="error-component">
      <div className="error-header">
        <img className="error-header-logo" src="./logo_v2.png" />
        <span className="error-header-info">{data.title}</span>
      </div>
      <div className="error-main">
        {data.desc.map((v, i) => (
          <p className={`error-main-text-${v.type || 'normal'}`} key={i}>
            {v.text}
          </p>
        ))}
      </div>
      {data.footer && (
        <div className="error-footer">
          <p className="error-footer-text">{data.footer}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
