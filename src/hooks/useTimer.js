import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback((duration) => {
    setSeconds(duration);
    setActive(true);
  }, []);

  const stop = useCallback(() => {
    setActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback((duration) => {
    stop();
    setSeconds(duration);
  }, [stop]);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progress = initialSeconds > 0 ? ((initialSeconds - seconds) / initialSeconds) * 100 : 0;

  return { seconds, active, formatted, progress, start, stop, reset };
}
