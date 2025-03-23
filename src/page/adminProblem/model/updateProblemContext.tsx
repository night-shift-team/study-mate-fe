import React, { createContext, ReactNode, useContext } from 'react';
import { ProblemDetailInfoRes } from '../api';
interface UpdateProblemContextType {
  updateProblemInfo: ProblemDetailInfoRes | null;
  setUpdateProblemInfo: React.Dispatch<
    React.SetStateAction<ProblemDetailInfoRes | null>
  >;
  children?: ReactNode;
}

export const UpdateProblemContext =
  createContext<UpdateProblemContextType | null>(null);

export const UpdateProblemProvider = ({
  updateProblemInfo,
  setUpdateProblemInfo,
  children,
}: UpdateProblemContextType) => {
  return (
    <UpdateProblemContext.Provider
      value={{ updateProblemInfo, setUpdateProblemInfo }}
    >
      {children}
    </UpdateProblemContext.Provider>
  );
};

export const useUpdateProblem = () => {
  const context = useContext(UpdateProblemContext);
  if (!context) {
    throw new Error(
      'useUpdateProblem must be used within a UpdateProblemProvider'
    );
  }
  return context;
};
