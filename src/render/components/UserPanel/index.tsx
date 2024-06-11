import './style.less';

const Index = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return '早上好,';
    } else if (hour >= 12 && hour < 14) {
      return '中午好,';
    } else if (hour >= 14 && hour < 18) {
      return '下午好,';
    } else if (hour >= 18 && hour < 24) {
      return '晚上好,';
    } else {
      return '深夜了,';
    }
  };

  const getUserAvatar = (userId: string, avatar?: string) => {
    if (/^https?/g.test(avatar || '')) {
      return avatar;
    } else if (avatar) {
      return `https://cdn.mahoutsukai.cn/uploads/passport/users/avatar/${userId}/${avatar}`;
    } else {
      return 'https://cdn.mahoutsukai.cn/assets/tilty/images/tilty_qq_avatar.png';
    }
  };

  return (
    <div className="user-panel">
      <div className="user-panel-top">
        <img className="user-panel-top-image" src={getUserAvatar('')} />
      </div>
      <div className="user-panel-bottom">
        <span className="user-panel-bottom-greeting">{greeting()}</span>
        <span className="user-panel-bottom-nickname">访客</span>
      </div>
    </div>
  );
};

export default Index;
