'use client';
import { DialogPopup } from '@/shared/ui/dialogPopup';
import { UserData, UserTableData } from './userTableData';
import { useState } from 'react';

export const UserTableForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex h-full w-full rounded-[2rem] bg-gray-100 p-[2%]">
      <table className="flex h-full w-full flex-col items-center">
        <thead className="flex h-fit w-full justify-center">
          <tr className="flex h-full w-full justify-between border-b border-dashed px-[5%]">
            <th className="flex w-[20%] items-center justify-center">유저명</th>
            <th className="flex w-[30%] items-center justify-center">
              생성 일자
            </th>
            <th className="flex w-[5%] items-center justify-center">
              풀은 문제
            </th>
            <th className="flex w-[30%] items-center justify-center">
              활성화(삭제일)
            </th>
            <th className="flex w-[15%] items-center justify-center">
              정지하기
            </th>
          </tr>
        </thead>
        <UserTableData userData={mockUserData} setDialogOpen={setDialogOpen} />
      </table>
      {dialogOpen && (
        <DialogPopup
          open={dialogOpen}
          title="유저 삭제"
          description="user1을 삭제하시겠습니까?"
          execFunc={() => console.log('execute function')}
          setDialogOpen={setDialogOpen}
        />
      )}
    </div>
  );
};

const mockUserData: UserData[] = [
  {
    username: 'user1',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user2',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user3',
    createdDt: '240531T00:14:32',
    solvedCount: 1,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user4',
    createdDt: '240531T00:14:32',
    solvedCount: 0,
    deletedDt: null,
  },
  {
    username: 'user5',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user6',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user7',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user8',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user9',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user10',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
];
