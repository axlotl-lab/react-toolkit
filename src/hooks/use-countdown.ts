import React from 'react';

type UseCountdownProps = { initialCount: number, interval?: number, autoStart?: boolean }
export const useCountdown = ({ initialCount, interval = 1000, autoStart }: UseCountdownProps) => {
  const [count, setCount] = React.useState(initialCount);
  const [isRunning, setIsRunning] = React.useState(autoStart);

  const start = React.useCallback(() => setIsRunning(true), []);
  const stop = React.useCallback(() => setIsRunning(false), []);
  const reset = React.useCallback(() => {
    setCount(initialCount);
    setIsRunning(autoStart);
  }, [initialCount]);

  React.useEffect(() => {
    if (!isRunning || count <= 0) return;

    const timer = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return currentCount - 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval, isRunning]);

  return { count, isRunning, start, stop, reset };
}