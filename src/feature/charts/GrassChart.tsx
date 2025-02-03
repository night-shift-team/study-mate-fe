import React from 'react';

const GrassChart = () => {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const weeks = Array(53).fill(0);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white p-4 scrollbar-hide">
      <div className="min-w-[780px]">
        <div className="flex">
          {/* 왼쪽 여백 */}
          <div className="w-8" />

          {/* 월 표시 */}
          <div className="mb-2 flex flex-1 text-xs text-gray-600">
            {months.map((month, index) => (
              <div
                key={index}
                className="flex-1"
                style={{
                  marginLeft: index === 0 ? 0 : '-8px', // 월 이름 겹침 방지
                }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* 요일 표시 */}
          <div className="flex w-8 flex-col justify-around text-xs text-gray-600">
            {days.map((day, index) => (
              <div key={index} className="h-3 pr-2 text-right">
                {index % 2 === 0 ? day : ''} {/* 격일로 표시하여 공간 확보 */}
              </div>
            ))}
          </div>

          {/* 잔디 그리드 */}
          <div className="flex flex-1 justify-between gap-[2px]">
            {weeks.map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {Array(7)
                  .fill(0)
                  .map((_, dayIndex) => {
                    const isWeekend = dayIndex === 5 || dayIndex === 6;
                    return (
                      <div
                        key={dayIndex}
                        className={`h-3 w-3 rounded-sm transition-colors duration-100 hover:ring-1 hover:ring-gray-300 ${isWeekend ? 'bg-[#ebedf0]/50' : 'bg-[#ebedf0]'}`}
                        title={`활동 내역 없음 (${days[dayIndex]}요일)`}
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* 범례 */}
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-600">
          <span>활동량:</span>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-sm bg-[#ebedf0]" title="0" />
            <div className="h-3 w-3 rounded-sm bg-[#9be9a8]" title="1-3" />
            <div className="h-3 w-3 rounded-sm bg-[#40c463]" title="4-7" />
            <div className="h-3 w-3 rounded-sm bg-[#30a14e]" title="8-12" />
            <div className="h-3 w-3 rounded-sm bg-[#216e39]" title="13+" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrassChart;
