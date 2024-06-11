import Background from '@/components/Background';
import TitleBar from '@/components/TitleBar';

import './style.less';

const Index = ({ error }: any) => {
  const reloadClient = () => {
    window.location.href = '/';
  };

  if (window.innerHeight > 256) {
    return (
      <div className="wrapper">
        <Background />
        <TitleBar />
        <div className="crash-component">
          <div className="crash-header">
            <img className="crash-header-logo" src="./logo_v2.png" />
            <span className="crash-header-info">发生致命错误</span>
          </div>
          <div className="crash-main">
            <p className="crash-main-text-primary">
              {error.toString()}
            </p>
          </div>
          <div className="crash-footer">
            <button className="crash-footer-button" onClick={reloadClient}>
              重新启动客户端
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <Background />
        <div className="crash-component crash-component-simple">
          <div className="crash-header">
            <span className="crash-header-info">发生致命错误</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Index;
