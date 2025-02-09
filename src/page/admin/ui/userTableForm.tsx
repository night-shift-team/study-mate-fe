'use client';
import { DialogPopup } from '@/shared/popUp/ui/dialogPopup';
import { UserData, UserTableData } from './userTableData';
import { useState } from 'react';

export const UserTableForm = ({ userData }: { userData: UserData[] }) => {
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
        <UserTableData userData={userData} setDialogOpen={setDialogOpen} />
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
