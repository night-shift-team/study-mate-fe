'use client';

import { GetLevelTestResultRes } from '@/page/level_test/api';
import TestResultContent from './testResultContent';

export interface ResultData extends GetLevelTestResultRes {
  userAnswers: number[];
}

const TestResultPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <TestResultContent />
    </div>
  );
};

export default TestResultPage;
