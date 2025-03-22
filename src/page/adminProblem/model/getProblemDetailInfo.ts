import { Dispatch, SetStateAction } from 'react';
import { getProblemDetailInfoApi, ProblemDetailInfoRes } from '../api';
import { ServerErrorResponse } from '@/shared/api/model/config';

export const getProblemDetail = async (
  problemId: string,
  setState: Dispatch<SetStateAction<ProblemDetailInfoRes | null>>
) => {
  try {
    const res = await getProblemDetailInfoApi(problemId);
    if (res.ok) {
      setState(res.payload as ProblemDetailInfoRes);
      return res.payload as ProblemDetailInfoRes;
    }
    throw res.payload as ServerErrorResponse;
  } catch (e) {
    console.log(e);
  }
};
