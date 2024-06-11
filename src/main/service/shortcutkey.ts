import { globalShortcut } from 'electron';

import { disableSuspensionWindow, enableSuspensionWindow } from '../handles/crosshair';
import { getForeWindow, setForeWindow } from '../utils/foreWindow';
import storage from '../utils/storage';
import createTarkovMiniWindow, { win as tarkovMiniWin } from '../windows/tarkovMiniSuspension';
import createTarkovWindow, { win as tarkovWin } from '../windows/tarkovSuspension';

let prevAcceleratorTarkov = storage.get('shortcutTarkov') || 'CommandOrControl+ALT+1';
let prevAcceleratorTarkovMini = storage.get('shortcutTarkovMini') || 'CommandOrControl+ALT+2';
let prevAcceleratorCrosshair = storage.get('shortcutCrosshair') || 'CommandOrControl+ALT+0';

export const registerShortcutKeyTarkov = (_accelerator: string) => {
  const accelerator = _accelerator || 'CommandOrControl+ALT+1';

  if (globalShortcut.isRegistered(prevAcceleratorTarkov)) {
    globalShortcut.unregister(prevAcceleratorTarkov);
  }
  globalShortcut.register(accelerator, () => {
    if (!tarkovWin || tarkovWin.isDestroyed()) {
      getForeWindow(() => {
        createTarkovWindow();
      });
    }
    if (tarkovWin && !tarkovWin.isDestroyed()) {
      if (tarkovWin.isVisible()) {
        setForeWindow(() => {
          tarkovWin.hide();
        });
      } else {
        getForeWindow(() => {
          tarkovWin.show();
        });
      }
    }
  });
  prevAcceleratorTarkov = accelerator;
};

export const registerTarkovMiniShortcutKey = (_accelerator: string) => {
  const accelerator = _accelerator || 'CommandOrControl+ALT+2';

  if (globalShortcut.isRegistered(prevAcceleratorTarkovMini)) {
    globalShortcut.unregister(prevAcceleratorTarkovMini);
  }
  globalShortcut.register(accelerator, () => {
    if (!tarkovMiniWin || tarkovMiniWin.isDestroyed()) {
      getForeWindow(() => {
        createTarkovMiniWindow();
      });
    }
    if (tarkovMiniWin && !tarkovMiniWin.isDestroyed()) {
      if (tarkovMiniWin.isVisible()) {
        setForeWindow(() => {
          tarkovMiniWin.hide();
        });
      } else {
        getForeWindow(() => {
          tarkovMiniWin.show();
        });
      }
    }
  });
  prevAcceleratorTarkovMini = accelerator;
};

export const registerCrosshairShortcutKey = (_accelerator: string) => {
  const accelerator = _accelerator || 'CommandOrControl+ALT+0';

  if (globalShortcut.isRegistered(prevAcceleratorCrosshair)) {
    globalShortcut.unregister(prevAcceleratorCrosshair);
  }
  globalShortcut.register(accelerator, () => {
    if (storage.get('crosshair_suspension')) {
      disableSuspensionWindow();
    } else {
      enableSuspensionWindow();
    }
  });
  prevAcceleratorCrosshair = accelerator;
};

export default () => {
  registerShortcutKeyTarkov(prevAcceleratorTarkov);
  registerTarkovMiniShortcutKey(prevAcceleratorTarkovMini);
  registerCrosshairShortcutKey(prevAcceleratorCrosshair);
};
