'use client';
import { useState } from 'react';
import { descriptions } from '../model/descriptions';
import { getContentsIcons } from './contentsIcons';
import { Icon } from '@iconify/react';
import playArrow from '@iconify/icons-mdi/play-arrow';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const OnboardingContents = () => {
  const [currentPage, setCurrentPage] = useState(0);

  if (currentPage >= descriptions.length) return null;

  return (
    <div className="flex w-full flex-col items-center">
      {getContentsIcons(currentPage)}
      <div className="mt-8 flex h-[10rem] w-full flex-col items-center font-pretandard text-body-primary">
        {descriptions[currentPage].map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 font-pixel">
        {currentPage < descriptions.length - 1 ? (
          <button
            className="flex items-center text-button-1"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <span>Next</span>
            <Icon icon={playArrow} width={24} height={24} />
          </button>
        ) : null}

        {currentPage === descriptions.length - 1 ? (
          <div className="flex flex-col gap-2">
            <Link
              href={RouteTo.LevelTest}
              className="flex items-center text-button-1"
            >
              <span>Start</span>
              <Icon icon={playArrow} width={24} height={24} />
            </Link>
            <Link
              href={RouteTo.Home}
              className="flex items-center text-button-1"
            >
              <span>Later</span>
              <Icon icon={playArrow} width={24} height={24} />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default OnboardingContents;
