import './style.less';

const Index = () => {
  const handleOpenTarkovSus = () => {
    ipcRenderer.send('tarkov_window_open');
  };

  return (
    <div className="tarkov-guide">
      <div className="tarkov-guide-header">
        <img className="tarkov-guide-header-logo" src="./tarkov/logo.png" />
      </div>
      <div className="tarkov-guide-main">
        <div className="tarkov-guide-main-notice">
          <p>1. Ctrl+Alt+1 打开缇尔蒂助手窗口</p>
          <p>2. Ctrl+Alt+2 打开简易物价查询窗口</p>
          <p>逃离塔科夫·缇尔蒂助手：<a href="https://tarkov.mahoutsukai.cn/">https://tarkov.mahoutsukai.cn/</a></p>
          <p>塔科夫维基：<a href="https://escapefromtarkov.fandom.com/zh/wiki">https://escapefromtarkov.fandom.com/zh/wiki</a></p>
          <p>跳蚤市场数据提供：<a href="https://tarkov.dev/">https://tarkov.dev/</a></p>
        </div>
        <div className="setting-advanced">
          <button className="setting-advanced-button" onClick={handleOpenTarkovSus}>
            打开缇尔蒂助手
          </button>
        </div>
      </div>
      <div className="tarkov-guide-footer">
        <p className="tarkov-guide-footer-text">Magic & Mana</p>
      </div>
    </div>
  );
};

export default Index;
