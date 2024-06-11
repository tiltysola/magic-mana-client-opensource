import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const _ipcRenderer = {
  send: (channel: string, ...args: any[]) => {
    console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Renderer => Main.');
    ipcRenderer.send(channel, ...args);
  },
  invoke: (channel: string, ...args: any[]) => {
    if (channel !== 'util_cursor_position') {
      console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Invoke.');
    }
    return ipcRenderer.invoke(channel, ...args);
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    const autoLog = () => {
      console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Main => Renderer.');
    };
    ipcRenderer.on(channel, autoLog);
    ipcRenderer.on(channel, callback);
    // React useEffect need this return function to destroy the event listener
    return () => {
      ipcRenderer.removeListener(channel, autoLog);
      ipcRenderer.removeListener(channel, callback);
    };
  },
  once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    const autoLog = () => {
      console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Main => Renderer.');
    };
    ipcRenderer.once(channel, autoLog);
    ipcRenderer.once(channel, callback);
    // React useEffect need this return function to destroy the event listener
    return () => {
      ipcRenderer.removeListener(channel, autoLog);
      ipcRenderer.removeListener(channel, callback);
    };
  },
} as const;

export type IpcRenderer = Readonly<typeof _ipcRenderer>;

contextBridge.exposeInMainWorld('ipcRenderer', _ipcRenderer);
