import { useState, useEffect } from 'react';

interface CountDownProps {
  time: number;
}

export const CountDown = ({ time }: CountDownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    setSecondsLeft(time);
  }, [time]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  return (
    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-point-orange text-white">
      {secondsLeft > 0 ? String(secondsLeft).padStart(2, '0') : '00'}
    </div>
  );
};
