import { FiClock } from 'react-icons/fi';
import useNoticeEndTimerV2 from '../model/noticeEndTimerV2Hook';

export const RemainTimeSV2 = ({ endDate }: { endDate: Date }) => {
  const { days, hours, minutes, seconds } = useNoticeEndTimerV2(endDate);

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
