'use client';
import { BsStopwatch } from 'react-icons/bs';

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
