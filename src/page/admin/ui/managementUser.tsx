import { UserTableForm } from './userTableForm';

const ManageUser = () => {
  return (
    <div className="flex h-full w-full px-[2.5%] py-[1%]">
      <div className="flex h-full w-full flex-col p-[1%] pt-[1%]">
        <div className="flex h-fit w-fit text-[3vh]">유저 관리</div>
        <div className="flex h-fit w-full justify-center pt-[1%] font-semibold">
          유저 리스트
        </div>
        <div className="flex h-fit w-full justify-end pr-[5.5%] pt-[1%]">
          <input
            placeholder="🔍 검색"
            className="flex h-fit w-[20%] min-w-[7rem] max-w-[9rem] rounded-2xl border border-black px-3 py-1 text-sm"
          ></input>
        </div>
        <div className="flex h-[70%] w-full px-[5%] pt-1.5">
          <UserTableForm />
        </div>
        <div className="flex h-fit w-full justify-center pt-[2%]">
          pagenation section
        </div>
      </div>
    </div>
  );
};
export default ManageUser;
