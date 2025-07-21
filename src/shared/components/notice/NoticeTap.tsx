import { useState } from 'react';

export const NoticeTap = () => {
  const [activeTab, setActiveTab] = useState<'공지' | '문의'>('공지');

  const tabs: ('공지' | '문의')[] = ['공지', '문의'];
  const tabWidth = 120;

  return (
    <div className="w-full text-white">
      <div className="relative flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`w-[${tabWidth}px] py-4 text-lg font-bold ${
              activeTab === tab ? 'text-point-yellow' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-300">
          <div
            className="absolute top-[-2px] h-[2px] bg-yellow-400 transition-all duration-300"
            style={{
              width: `${tabWidth}px`,
              left: activeTab === '공지' ? 0 : `${tabWidth}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
