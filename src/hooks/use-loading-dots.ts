import React from "react";

export const useLoadingDots = (intervalTime = 500) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  return dots;
};
