/* eslint-disable */
import { useEffect, useRef } from 'react';

const useAnimationFrame = (callback: FrameRequestCallback) => {
  const callbackRef = useRef(callback);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current || 0);
  }, []);
};

export default useAnimationFrame;
