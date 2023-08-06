import { useState, useEffect, useCallback } from 'react';

export function useCountdown(time: number) {
  const [remainingTime, setRemainingTime] = useState(time);
  const [formattedTime, setFormattedTime] = useState('00:00');

  const resetTime = () => {
    setRemainingTime(time);
  };
  const stopTimer = () => {
    setRemainingTime(0);
  };

  const setNewTime = (newTime: number) => {
    setRemainingTime(newTime);
  };

  const formatTime = useCallback(
    (time: number) => {
      const hours = Math.trunc((time / 3600));
      const minutes = Math.trunc((time % 3600 / 60));
      const seconds = time % 3600 % 60;
      let formattedHours = '00';
      let formattedMinutes = '00';
      let formattedSeconds = '00';

      if (hours < 10) {
        formattedHours = `0${hours}`;
      } else {
        formattedHours = `${hours}`;
      }
      if (minutes < 10) {
        formattedMinutes = `0${minutes}`;
      } else {
        formattedMinutes = `${minutes}`;
      }
      if (seconds < 10) {
        formattedSeconds = `0${seconds}`;
      } else {
        formattedSeconds = `${seconds}`;
      }
      return time >= 3600 ? `${formattedHours}:${formattedMinutes}` : `${formattedMinutes}:${formattedSeconds}`;
    },
    [remainingTime]
  );

  useEffect(() => {
    let timer: string | number | NodeJS.Timer | undefined;

    if (remainingTime > 0) {
      timer = setInterval(() => {
        const newTime = remainingTime - 1;
        const newFormattedTime = formatTime(newTime);
        setRemainingTime(newTime);
        setFormattedTime(newFormattedTime);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  return {
    remainingTime,
    formattedTime,
    resetTime,
    setNewTime,
    stopTimer
  };
}

/**
 * remainingTime: RETURN ONLY DIGITS
 * formattedTime: RETURN MINUTES:SECONDS FORMAT
 * resetTime: RESET TIMER BASED FROM THE INITIALIZED TIME IN useCountdown FUNCTION.
 * setNewTime: RESETTING TIMER BASED ON ITS NEW VALUE
 * stopTimer: STOPPING TIMER.
 */
