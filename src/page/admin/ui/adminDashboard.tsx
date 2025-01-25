import { DetailManagementButton } from './detailManagementButton';

const AdminDashboard = () => {
  return (
    <div className="flex h-full w-full px-[1%]">
      <div className="flex h-full w-[50%] flex-shrink-0 flex-col p-[2.5%]">
        <DetailManagementButton title="유저 관리" buttonText="상세 보기" />
        <RecentUserComponent
          title="생성"
          titleColor="text-green-500"
          userData={mockCreatedUser}
        />
        <RecentUserComponent
          title="정지"
          titleColor="text-red-500"
          userData={mockDeletedUser}
        />
      </div>
      <div className="flex h-full w-[50%] flex-shrink-0 flex-col p-[2.5%]">
        <DetailManagementButton title="문제 관리" buttonText="더 보기" />
        <div className="flex h-[65%] w-full">
          <div className="relative mt-[2%] flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-[2rem] bg-gray-100 pt-[3%]">
            <span className="flex h-[10%] w-full flex-shrink-0 items-center justify-center whitespace-pre-wrap text-[2.5vh] font-semibold">
              문제 <span className="text-yellow-500">업데이트</span> 내역
            </span>
            <table className="flex h-[90%] w-full flex-shrink-0 flex-col items-center pt-[3%] text-[1.5vh]">
              <thead className="flex h-[15%] w-full flex-shrink-0 justify-center">
                <tr className="flex h-full w-[90%] flex-shrink-0 justify-between border-b border-dashed px-[5%]">
                  <th>문제번호</th>
                  <th>카테고리</th>
                  <th>생성일자</th>
                  <th>Status</th>
                  <th>Solved</th>
                </tr>
              </thead>
              <tbody className="flex h-[80%] min-h-[4rem] w-full flex-shrink-0 flex-col items-center overflow-y-auto scrollbar-hide"></tbody>
            </table>
          </div>
        </div>
        <div className="flex h-[15%] w-full justify-between px-[5%] font-bold">
          <button className="mt-[7%] flex h-[80%] w-[25%] items-center justify-center rounded-2xl bg-[#ECCDB4] text-black shadow-md hover:bg-[#E65A5A] hover:text-white active:scale-[0.97] active:cursor-grabbing active:bg-[#D94D4D] active:shadow-sm">
            {' '}
            문제 삭제
          </button>
          <button className="mt-[7%] flex h-[80%] w-[25%] items-center justify-center rounded-2xl bg-[#ECCDB4] text-black shadow-md hover:border-2 hover:border-[#4E96F0] hover:bg-[#4E96F0] hover:text-white active:scale-[0.97] active:cursor-grabbing active:bg-[#3D86E0] active:shadow-sm">
            {' '}
            문제 수정
          </button>
          <button className="mt-[7%] flex h-[80%] w-[25%] items-center justify-center rounded-2xl bg-[#ECCDB4] text-black shadow-md hover:bg-[#2DBE87] hover:text-white active:scale-[0.97] active:cursor-grabbing active:bg-[#28A374] active:shadow-sm">
            {' '}
            문제 생성
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

const RecentUserComponent = ({
  title,
  titleColor,
  userData,
}: {
  title: string;
  titleColor: string;
  userData: MockCreatedUser[] | MockDeletedUser[];
}) => {
  return (
    <div className="relative mt-[2%] flex h-[40%] w-full flex-shrink-0 flex-col items-center justify-center rounded-[2rem] bg-gray-100 pt-[3%]">
      <span className="flex h-[10%] w-full flex-shrink-0 items-center justify-center whitespace-pre-wrap text-[2.5vh] font-semibold">
        최근 <span className={titleColor}>{title}</span> 유저
      </span>
      <table className="flex h-[90%] w-full flex-shrink-0 flex-col items-center pt-[3%] text-[2vh]">
        <thead className="flex h-[15%] w-full flex-shrink-0 justify-center">
          <tr className="flex h-full w-[90%] flex-shrink-0 justify-between border-b border-dashed px-[5%]">
            <th>유저명</th>
            <th>생성 일자</th>
            <th>풀은 문제</th>
          </tr>
        </thead>
        <tbody className="flex h-[80%] min-h-[4rem] w-full flex-shrink-0 flex-col items-center overflow-y-auto scrollbar-hide">
          {userData.map((data, key) => {
            return (
              <tr
                key={key}
                className="flex h-[30%] min-h-[2rem] w-[90%] flex-shrink-0 items-center justify-between border-b border-dotted px-[5%] py-[0.5%]"
              >
                <td>{data.user}</td>
                <td>
                  {(data as MockCreatedUser).createdDt ||
                    (data as MockDeletedUser).deletedDt}
                </td>
                <td>{data.solvedCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface MockCreatedUser {
  user: string;
  createdDt: string;
  solvedCount: number;
}
interface MockDeletedUser {
  user: string;
  deletedDt: string;
  solvedCount: number;
}

const mockCreatedUser: MockCreatedUser[] = [
  {
    user: 'user1',
    createdDt: '20240431T00:12:31',
    solvedCount: 50,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
  {
    user: 'user3',
    createdDt: '20240431T00:12:31',
    solvedCount: 15,
  },
];
const mockDeletedUser: MockDeletedUser[] = [
  {
    user: 'user4',
    deletedDt: '20240431T00:12:31',
    solvedCount: 5,
  },
  {
    user: 'user6',
    deletedDt: '20240431T00:12:31',
    solvedCount: 1,
  },
];
