import { useLayoutEffect, useState } from 'react';
import { ProblemDetailInfoRes } from '../api';
import { getProblemDetail } from './getProblemDetailInfo';
import { HorizonTalScrollContainer } from '@/shared/window/model/eventMouse';
import { Problem } from '../ui';

const useProblemDetail = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemDetailInfo, setProblemDetailInfo] =
    useState<ProblemDetailInfoRes | null>(null);

  useLayoutEffect(() => {
    if (selectedProblem) {
      getProblemDetail(selectedProblem.id, setProblemDetailInfo).then(() => {
        try {
          setProblemDetailInfo(
            (prev) =>
              prev && { ...prev, options: JSON.parse(prev.options as string) }
          );
        } catch (e) {
          console.log(e);
        }
      });
      return;
    }

    const sessionProblemData = sessionStorage.getItem('selectedProblemInfo');
    if (sessionProblemData && !selectedProblem) {
      setSelectedProblem(JSON.parse(sessionProblemData));
    }
  }, [selectedProblem]);

  useLayoutEffect(() => {
    HorizonTalScrollContainer();
  }, []);

  return { problemDetailInfo };
};
export default useProblemDetail;
