'use client';
import { BsStopwatch } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RemainTimeProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const RemainTimeSV1 = ({
  days,
  hours,
  minutes,
  seconds,
}: RemainTimeProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-gray-100 p-6 font-sans">
      <div className="mb-4 flex items-center text-lg font-semibold text-gray-700">
        <BsStopwatch className="mr-2" /> Remaining Time
      </div>
      <div className="flex gap-2.5">
        <div className="flex flex-col items-center">
          <div className="min-w-[60px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-2xl font-bold text-gray-700">
            {String(days).padStart(2, '0')}
          </div>
          <div className="mt-1.5 text-sm text-gray-500">day</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="min-w-[60px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-2xl font-bold text-gray-700">
            {String(hours).padStart(2, '0')}
          </div>
          <div className="mt-1.5 text-sm text-gray-500">hr</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="min-w-[60px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-2xl font-bold text-gray-700">
            {String(minutes).padStart(2, '0')}
          </div>
          <div className="mt-1.5 text-sm text-gray-500">min</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="min-w-[60px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-2xl font-bold text-gray-700">
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="mt-1.5 text-sm text-gray-500">sec</div>
        </div>
      </div>
    </div>
  );
};

export const RemainTimeSV2 = ({ dateProps }: { dateProps: Date }) => {
  const [date, setDate] = useState(dateProps);
  const currentTime = Date.now();
  const days = currentTime >= date.getTime() ? 0 : date.getDate();
  const hours = currentTime >= date.getTime() ? 0 : date.getHours();
  const minutes = currentTime >= date.getTime() ? 0 : date.getMinutes();
  const seconds = currentTime >= date.getTime() ? 0 : date.getSeconds();
  const router = useRouter();
  useLayoutEffect(() => {
    router.refresh();
    if (currentTime >= date.getTime()) {
      router.refresh();
      return;
    }
    const decreaseRemainTimeInterval = setInterval(() => {
      setDate((prev) => new Date(prev.getTime() - 1000));
    }, 1000);

    return () => {
      clearInterval(decreaseRemainTimeInterval);
    };
  }, []);
  return (
    <div className="mx-auto max-w-2xl bg-white p-8 font-sans">
      <div className="mb-6 flex items-center justify-center text-lg font-semibold text-black">
        <FiClock className="mr-2.5 text-orange-500" /> 남은 시간
      </div>
      <div className="mb-4 flex items-end justify-center gap-1">
        <span className="mx-1.5 text-3xl font-bold text-orange-500">+ </span>
        <span className="text-4xl font-bold text-black">{days}</span>
        <span className="mr-2.5 text-base font-semibold text-orange-500">
          Days
        </span>
        {/* <span className="text-3xl font-bold text-orange-500 mx-1.5">:</span> */}
        <span className="text-4xl font-bold text-black">
          {String(hours).padStart(2, '0')}
        </span>
        <span className="mr-2.5 text-base font-semibold text-orange-500">
          Hrs
        </span>
        {/* <span className="text-3xl font-bold text-orange-500 mx-1.5">:</span> */}
        <span className="text-4xl font-bold text-black">
          {String(minutes).padStart(2, '0')}
        </span>
        <span className="mr-2.5 text-base font-semibold text-orange-500">
          Min
        </span>
        {/* <span className="text-3xl font-bold text-orange-500 mx-1.5">:</span> */}
        <span className="text-4xl font-bold text-black">
          {String(seconds).padStart(2, '0')}
        </span>
        <span className="text-base font-semibold text-orange-500">Sec</span>
      </div>
    </div>
  );
};
