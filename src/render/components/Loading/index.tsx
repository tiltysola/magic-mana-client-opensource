import classNames from 'classnames';

import './style.less';

interface LoadingProps {
  loading: boolean;
}

const Index = ({ loading }: LoadingProps) => {
  return (
    <div
      className={classNames('loading', {
        active: loading,
      })}
    >
      <img className="loading-base" src="./loading-base.png" draggable={false} />
      <img className="loading-outer" src="./loading-outer.png" draggable={false} />
      <img className="loading-inner" src="./loading-inner.png" draggable={false} />
    </div>
  );
};

export default Index;
