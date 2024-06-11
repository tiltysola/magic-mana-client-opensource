/* eslint-disable */
import React, { useEffect, useRef } from 'react';

interface IpcRendererListener {
  (event: Event, ...args: any[]): void;
}

export default {
  on: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);
    useEffect(() => {
      const removeListener = ipcRenderer.on(channelRef.current, callbackRef.current);
      return () => {
        removeListener();
      };
    }, deps || []);
  },
  once: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);
    useEffect(() => {
      const removeListener = ipcRenderer.once(channelRef.current, callbackRef.current);
      return () => {
        removeListener();
      };
    }, deps || []);
  },
};
