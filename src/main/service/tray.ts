import { screen, Tray } from 'electron';
import path from 'path';

import { APP_PATH } from '../utils/constant';
import session from '../utils/session';
import createWindow, { win } from '../windows/main';
import createTrayWindow, { win as trayWin } from '../windows/tray';

export default () => {
  /* InitTrayWindow: start  */
  // createTrayWindow();
  /* InitTrayWindow: end  */

  /* SystemTray: start */
  let trayPath = '';

  if (process.platform === 'win32') {
    trayPath = path.join(APP_PATH, 'build/icons/png/common/16x16.png');
  } else if (process.platform === 'darwin') {
    trayPath = path.join(APP_PATH, 'build/icons/png/common/16x16.png');
  } else if (process.platform === 'linux') {
    trayPath = path.join(APP_PATH, 'build/icons/png/common/16x16.png');
  }

  const systemTray = new Tray(trayPath);

  session.set('tray', systemTray);
  /* SystemTray: end */

  systemTray.setToolTip('缇尔蒂的魔法小屋');

  /* DoubleClick: start */
  systemTray.on('double-click', () => {
    if (win && !win.isDestroyed()) {
      win.focus();
    } else {
      createWindow();
    }
  });
  /* DoubleClick: end */

  /* Click: start */
  const handleClick = (e: any, bounds: any) => {
    if (!trayWin || trayWin.isDestroyed()) {
      createTrayWindow();
    }
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth } = primaryDisplay.bounds;
    const { x, y, width, height } = bounds;
    const [centerX] = [x + width / 2, y + height / 2];
    const [trayWidth, trayHeight] = [180, 284];
    let showPosition = 0; // 0: hide, 1: top, 2: bottom, 4: center, 8: right
    if (y >= trayHeight + 40) {
      showPosition += 1;
    } else {
      showPosition += 2;
    }
    if (screenWidth - centerX >= trayWidth / 2 + 40) {
      showPosition += 4;
    } else {
      showPosition += 8;
    }
    let showPos = [0, 0];
    if (showPosition === 5) {
      showPos = [centerX - trayWidth / 2, y - trayHeight];
    } else if (showPosition === 6) {
      showPos = [centerX - trayWidth / 2, y + 20];
    } else if (showPosition === 9) {
      showPos = [screenWidth - trayWidth - 20, y - trayHeight];
    } else if (showPosition === 10) {
      showPos = [screenWidth - trayWidth - 20, y + 20];
    }
    trayWin.setPosition(Math.floor(showPos[0]), Math.floor(showPos[1]));
    trayWin.show();
  };
  if (process.platform === 'darwin') {
    systemTray.on('click', handleClick);
  }
  systemTray.on('right-click', handleClick);
  /* Click: end */
};
