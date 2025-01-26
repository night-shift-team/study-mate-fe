'use client';

import { Dispatch, SetStateAction } from 'react';

export interface UserData {
  username: string;
  createdDt: string;
  solvedCount: number;
  deletedDt: string | null;
}
[];

export const UserTableData = ({
  userData,
  setDialogOpen,
}: {
  userData: UserData[];
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <tbody className="flex h-full w-full flex-col items-center overflow-y-auto scrollbar-hide">
      {userData.map((data, key) => {
        return (
          <tr
            key={key}
            className="flex h-[10%] w-full justify-between border-b border-dotted px-[5%] py-[0.5%]"
          >
            <td className="flex w-[20%] items-center justify-center">
              {data.username}
            </td>
            <td className="flex w-[30%] items-center justify-center">
              {data.createdDt}
            </td>
            <td className="flex w-[5%] items-center justify-center">
              {data.solvedCount}
            </td>
            <td className="flex w-[30%] items-center justify-center">
              {data.deletedDt ?? '🟢'}
            </td>
            <td
              className={`flex w-[15%] items-center justify-center ${data.deletedDt === null ? 'hover:cursor-pointer active:cursor-grabbing' : ''}`}
              onClick={() => {
                if (data.deletedDt === null) {
                  console.log('open popup');
                  setDialogOpen(true);
                }
              }}
            >
              {data.deletedDt === null ? '🔴' : '⚪'}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
