import { useEffect, useState } from 'react';
import { ColorPicker, toColor } from 'react-color-palette';

import { useTimeout, useUpdateEffect } from 'ahooks';

import { message } from '@/components/Message';

import ShortcutKey from './ShortcutKey';

import './style.less';
import './rcp.less';

const Index = () => {
  const [background, setBackground] = useState();
  const [channel, setChannel] = useState('');
  const [forefix, setForefix] = useState(false);
  const [startup, setStartup] = useState(false);
  const [tarkovScreenshotPath, setTarkovScreenshotPath] = useState();
  const [tarkovLocation, setTarkovLocation] = useState<any>(false);
  const [tarkovLocationUnlink, setTarkovLocationUnlink] = useState<any>(false);
  const [shortcutTarkov, setShortcutTarkov] = useState<any>([]);
  const [shortcutTarkovMini, setShortcutTarkovMini] = useState<any>([]);
  const [shortcutCrosshair, setShortcutCrosshair] = useState<any>([]);
  const [crosshairConfig, setCrosshairConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getBackground = () => {
    ipcRenderer.invoke('setting_bg_get').then((data) => {
      if (data) {
        setBackground(data.replace(/\\/g, '/'));
      }
    });
  };

  const getTarkovScreenshotPath = () => {
    ipcRenderer.invoke('tarkov_screenshot_path_get').then((data) => {
      if (data) {
        setTarkovScreenshotPath(data.replace(/\\/g, '/'));
      }
    });
  };

  const getChannel = () => {
    ipcRenderer.invoke('updater_channel_get').then((data) => {
      setChannel(data || '');
    });
  };

  const getForefix = () => {
    ipcRenderer.invoke('util_forefix').then((data) => {
      setForefix(data || '');
    });
  };

  const getStartup = () => {
    ipcRenderer.invoke('util_startup').then((data) => {
      setStartup(data || '');
    });
  };

  const getTarkovLocation = () => {
    ipcRenderer.invoke('tarkov_location').then((data) => {
      setTarkovLocation(data || false);
    });
  };

  const getTarkovLocationUnlink = () => {
    ipcRenderer.invoke('tarkov_location_unlink').then((data) => {
      setTarkovLocationUnlink(data || false);
    });
  };

  const getCrosshair = () => {
    ipcRenderer.invoke('crosshair_config').then((data) => {
      setCrosshairConfig(data || {});
    });
  };

  const getShortcut = () => {
    ipcRenderer.invoke('shorcutkey_tarkov_get').then((data) => {
      setShortcutTarkov((data || '').split('+'));
    });
    ipcRenderer.invoke('shorcutkey_tarkov_mini_get').then((data) => {
      setShortcutTarkovMini((data || '').split('+'));
    });
    ipcRenderer.invoke('shorcutkey_crosshair_get').then((data) => {
      setShortcutCrosshair((data || '').split('+'));
    });
  };

  const handleSelectBackground = () => {
    ipcRenderer.invoke('setting_bg_dialog').then((data) => {
      if (data && data[0]) {
        ipcRenderer.send('setting_bg_set', data[0]);
        setBackground(data[0].replace(/\\/g, '/'));
      }
    });
  };

  const handleClearBackground = () => {
    ipcRenderer.send('setting_bg_set', null);
    getBackground();
  };

  const handleSelectTarkovScreenshotPath = () => {
    ipcRenderer.invoke('tarkov_screenshot_path_dialog').then((data) => {
      if (data && data[0]) {
        ipcRenderer.send('tarkov_screenshot_path_set', data[0]);
        setTarkovScreenshotPath(data[0].replace(/\\/g, '/'));
      }
    });
  };

  const handleClearTarkovScreenshotPath = () => {
    ipcRenderer.send('tarkov_screenshot_path_set', null);
    getTarkovScreenshotPath();
  };

  const handleCheckUpdate = () => {
    ipcRenderer.send('updater_check');
  };

  const handleDeleteProperties = () => {
    ipcRenderer.invoke('setting_delete_properties').then(() => {
      message.show({ content: '配置信息已清空，请重新启动客户端完成更新。' });
    });
  };

  const handleRefresh = () => {
    location.reload();
  };

  useUpdateEffect(() => {
    if (!loading) {
      ipcRenderer.send('updater_channel_set', channel);
    }
  }, [channel]);

  useUpdateEffect(() => {
    if (!loading) {
      ipcRenderer.invoke('util_forefix', forefix);
    }
  }, [forefix]);

  useUpdateEffect(() => {
    if (!loading) {
      ipcRenderer.invoke('util_startup', startup);
    }
  }, [startup]);

  useUpdateEffect(() => {
    if (!loading) {
      ipcRenderer.invoke('tarkov_location', tarkovLocation);
    }
  }, [tarkovLocation]);

  useUpdateEffect(() => {
    if (!loading) {
      ipcRenderer.invoke('tarkov_location_unlink', tarkovLocationUnlink);
    }
  }, [tarkovLocationUnlink]);

  useEffect(() => {
    getBackground();
    getChannel();
    getForefix();
    getStartup();
    getTarkovScreenshotPath();
    getTarkovLocation();
    getTarkovLocationUnlink();
    getCrosshair();
    getShortcut();
  }, []);

  useTimeout(() => {
    setLoading(false);
  }, 200);

  if (!loading) {
    return (
      <div className="setting">
        <div className="setting-bg">
          <span className="setting-bg-label">背景图片地址：</span>
          <input
            className="setting-bg-input"
            value={background || ''}
            onClick={handleSelectBackground}
          />
          <button className="setting-bg-clear" onClick={handleClearBackground}>
            还原默认背景
          </button>
        </div>
        <div className="setting-channel">
          <span className="setting-channel-label">更新通道设置：</span>
          <select
            className="setting-channel-select"
            value={channel || ''}
            onChange={(e) => {
              setChannel(e.target.value);
            }}
          >
            <option value="latest">稳定版通道</option>
            {/* <option value="alpha">ALPHA CHANNEL</option> */}
            <option value="beta">测试版通道</option>
          </select>
          <span className="setting-channel-addi">BETA通道可能会出现各种BUG，请谨慎选择。</span>
        </div>
        <div className="setting-shortcuts">
          <span className="setting-shortcuts-label">快捷键设置：</span>
          <div className="setting-shortcuts-item">
            <span className="setting-shortcuts-item-label">塔科夫独立页面:</span>
            <ShortcutKey
              value={shortcutTarkov}
              onChange={(value) => {
                setShortcutTarkov(value);
                ipcRenderer.send('shorcutkey_tarkov_set', value.join('+'));
              }}
            />
            <span className="setting-shortcuts-item-addi">
              默认快捷键：Ctrl+Alt+1
            </span>
          </div>
          <div className="setting-shortcuts-item">
            <span className="setting-shortcuts-item-label">塔科夫物品查询:</span>
            <ShortcutKey
              value={shortcutTarkovMini}
              onChange={(value) => {
                setShortcutTarkovMini(value);
                ipcRenderer.send('shorcutkey_tarkov_mini_set', value.join('+'));
              }}
            />
            <span className="setting-shortcuts-item-addi">
              默认快捷键：Ctrl+Alt+2
            </span>
          </div>
          <div className="setting-shortcuts-item">
            <span className="setting-shortcuts-item-label">屏幕准星快捷键:</span>
            <ShortcutKey
              value={shortcutCrosshair}
              onChange={(value) => {
                setShortcutCrosshair(value);
                ipcRenderer.send('shorcutkey_crosshair_set', value.join('+'));
              }}
            />
            <span className="setting-shortcuts-item-addi">
              默认快捷键：Ctrl+Alt+0
            </span>
          </div>
        </div>
        <div className="setting-crosshair">
          <span className="setting-crosshair-label">准星设置：</span>
          <div className="setting-crosshair-x">
            <span className="setting-crosshair-x-label">准星X偏移量：</span>
            <input
              className="setting-crosshair-x-input"
              value={crosshairConfig?.x || '0'}
              placeholder="准星的X偏移量"
              type="number"
              onChange={(e) => {
                const config = {
                  ...crosshairConfig,
                  x: parseInt(e.target.value, 10),
                };
                setCrosshairConfig(config);
                ipcRenderer.invoke('crosshair_config', config);
              }}
            />
          </div>
          <div className="setting-crosshair-y">
            <span className="setting-crosshair-y-label">准星Y偏移量：</span>
            <input
              className="setting-crosshair-y-input"
              value={crosshairConfig?.y || '0'}
              placeholder="准星的Y偏移量"
              type="number"
              onChange={(e) => {
                const config = {
                  ...crosshairConfig,
                  y: parseInt(e.target.value, 10),
                };
                setCrosshairConfig(config);
                ipcRenderer.invoke('crosshair_config', config);
              }}
            />
          </div>
          <div className="setting-crosshair-color">
            <span className="setting-crosshair-color-label">准星颜色：</span>
            <div className="setting-crosshair-color-popover">
              <div className="setting-crosshair-color-popover-element">
                <input
                  className="setting-crosshair-color-input"
                  value={crosshairConfig?.color || '#88ff88'}
                  placeholder="准星的颜色"
                  onChange={(e) => {
                    const config = {
                      ...crosshairConfig,
                      color: e.target.value,
                    };
                    setCrosshairConfig(config);
                    ipcRenderer.invoke('crosshair_config', config);
                  }}
                  readOnly
                />
              </div>
              <div className="setting-crosshair-color-popover-content">
                <ColorPicker
                  width={176}
                  height={88}
                  color={toColor('hex', crosshairConfig?.color || '#88ff88')}
                  onChange={(e) => {
                    const config = {
                      ...crosshairConfig,
                      color: e.hex,
                    };
                    setCrosshairConfig(config);
                    ipcRenderer.invoke('crosshair_config', config);
                  }}
                  hideHEX
                  hideRGB
                  hideHSV
                />
              </div>
            </div>
          </div>
          <div className="setting-crosshair-size">
            <span className="setting-crosshair-size-label">准星大小：</span>
            <input
              className="setting-crosshair-size-input"
              value={crosshairConfig?.size || '12'}
              placeholder="准星的大小"
              type="number"
              onChange={(e) => {
                const config = {
                  ...crosshairConfig,
                  size: e.target.value,
                };
                setCrosshairConfig(config);
                ipcRenderer.invoke('crosshair_config', config);
              }}
            />
          </div>
        </div>
        <div className="setting-tarkov">
          <span className="setting-tarkov-label">塔科夫设置：</span>
          <div className="setting-tarkov-checkbox">
            <input
              id="tarkovlocation"
              type="checkbox"
              checked={tarkovLocation || false}
              onChange={(e) => {
                if (e.target.checked === true) {
                  message.show({
                    content: (
                      <div>
                        <p>启用塔科夫截图坐标将会监听您的目录变化。</p>
                        <p>/User/Documents/Escape From Tarkov/Screenshots</p>
                      </div>
                    ),
                    onOk: () => {
                      setTarkovLocation(true);
                      return false;
                    },
                  });
                } else {
                  setTarkovLocation(false);
                }
              }}
            /><label htmlFor="tarkovlocation">启用塔科夫截图坐标</label>
          </div>
          <div className="setting-tarkov-checkbox">
            <input
              id="tarkovlocationunlink"
              type="checkbox"
              checked={tarkovLocationUnlink || false}
              onChange={(e) => {
                if (e.target.checked === true) {
                  message.show({
                    content: (
                      <div>
                        <p>自动删除截图文件将会对您的目录进行修改。</p>
                        <p>/User/Documents/Escape From Tarkov/Screenshots</p>
                      </div>
                    ),
                    onOk: () => {
                      setTarkovLocationUnlink(true);
                      return false;
                    },
                  });
                } else {
                  setTarkovLocationUnlink(false);
                }
              }}
            /><label htmlFor="tarkovlocationunlink">自动删除截图文件</label>
          </div>
        </div>
        <div className="setting-tsp">
          <span className="setting-tsp-label">塔科夫截图目录：</span>
          <input
            className="setting-tsp-input"
            value={tarkovScreenshotPath || ''}
            onClick={handleSelectTarkovScreenshotPath}
          />
          <button className="setting-tsp-clear" onClick={handleClearTarkovScreenshotPath}>
            还原默认目录
          </button>
        </div>
        <div className="setting-others">
          <span className="setting-others-label">其它设置：</span>
          <div className="setting-others-checkbox">
            <input
              id="forefix"
              type="checkbox"
              checked={forefix || false}
              onChange={(e) => {
                if (e.target.checked === true) {
                  message.show({
                    content: (
                      <div>
                        <p>悬浮窗焦点修复功能使用了 C# 进行构建。</p>
                        <p>动态链接库： user32.dll</p>
                        <p>方法： <br />SetForegroundWindow<br />GetForegroundWindow<br />PostMessage</p>
                        <p>本软件不对当前功能的安全性负责。</p>
                        <p>相关源代码您可查看： <br />/external/ForegroundWindow/ForegroundWindow/Program.cs</p>
                      </div>
                    ),
                    onOk: () => {
                      setForefix(true);
                      return false;
                    },
                  });
                } else {
                  setForefix(false);
                }
              }}
            /><label htmlFor="forefix">悬浮窗焦点修复</label>
          </div>
          <div className="setting-others-checkbox">
            <input
              id="startup"
              type="checkbox"
              checked={startup || false}
              onChange={(e) => {
                setStartup(e.target.checked);
              }}
            /><label htmlFor="startup">开机自启动 (Windows Only)</label>
          </div>
        </div>
        <div className="setting-advanced">
          <span className="setting-advanced-label">高级设置：</span>
          <button className="setting-advanced-button" onClick={handleCheckUpdate}>
            检查更新
          </button>
          <button className="setting-advanced-button" onClick={handleDeleteProperties}>
            清空配置信息
          </button>
          <button className="setting-advanced-button" onClick={handleRefresh}>
            重载客户端
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Index;
