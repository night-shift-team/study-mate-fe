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

export const RemainTimeSV2 = ({ endDate }: { endDate: Date }) => {
  const currentTime = Date.now();
  const [date, setDate] = useState(
    endDate.getTime() - currentTime <= 0 ? 0 : endDate.getTime() - currentTime
  );
  const days = Math.floor(date / (1000 * 60 * 60 * 24));
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((date % (1000 * 60)) / 1000);

  const router = useRouter();

  useLayoutEffect(() => {
    if (date <= 0) {
      router.refresh();
      return;
    }
    const decreaseRemainTimeInterval = setInterval(() => {
      setDate((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(decreaseRemainTimeInterval);
    };
  }, []);

  // console.log(currentTime, date.getTime())
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
