import { useCallback, useRef, useState } from "react";

type LongPressOptions = {
  onLongPress: () => void;
  onPress?: () => void; 
  delay?: number; 
};

export const useLongPress = ({
  onLongPress,
  onPress,
  delay = 500,
}: LongPressOptions) => {
  const [isPressing, setIsPressing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = useCallback(() => {
    setIsPressing(true);
    timeoutRef.current = setTimeout(() => {
      onLongPress();
      setIsPressing(false);
    }, delay);
  }, [onLongPress, delay]);

  const endPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (isPressing) {
      onPress?.();
    }
    setIsPressing(false);
  }, [onPress, isPressing]);

  const handleMouseDown = () => startPress();
  const handleMouseUp = () => endPress();
  const handleMouseLeave = () => endPress();

  const handleTouchStart = () => startPress();
  const handleTouchEnd = () => endPress();

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};
