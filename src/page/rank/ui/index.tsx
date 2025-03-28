'use client';

import { useEffect, useState } from 'react';
import { getUserRankingApi } from '../api';
import Pagination from '@mui/material/Pagination';

export const RankPageComponent = () => {
  const PAGE_LIMIT = 10;
  const [myRanking, setMyRanking] = useState<number | null>(null);
  const [otherUsers, setOtherUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    userRanking();
  }, []);

  const userRanking = async () => {
    setIsLoading(true);
    try {
      const res = await getUserRankingApi(0, 10000);
      console.log('랭킹조회', res);
      if (res.ok && res.payload) {
        if ('myRanking' in res.payload && 'otherUsers' in res.payload) {
          setMyRanking(res.payload.myRanking);
          setOtherUsers(res.payload.otherUsers);
          setTotalPages(Math.ceil(res.payload.otherUsers.length / PAGE_LIMIT));
        } else {
          console.error('Unexpected payload structure', res.payload);
        }
      } else {
        console.error('API 요청 실패', res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const displayedUsers = otherUsers.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );

  return (
    <div className="flex h-full w-full max-w-4xl flex-col justify-between gap-2 rounded-2xl bg-white p-3 md:shadow-lg">
      <div className="">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 md:text-lg">
          나의 랭킹: <span className="">{myRanking ?? '-'}등</span>
        </h3>
        <h3 className="mb-3 text-sm font-medium text-gray-700 md:text-sm">
          유저 랭킹
        </h3>
      </div>

      {/* 로딩 중일 때 메시지 표시 */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-lg text-gray-500">
          로딩 중입니다...
        </div>
      ) : (
        <>
          {/* 반응형 테이블 컨테이너 */}
          <div className="h-[80vh] overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[500px] border-collapse">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm text-gray-600 md:text-base">
                  <th className="px-2 py-1 text-center md:px-3">순위</th>
                  <th className="px-2 py-1 text-center md:px-3">프로필</th>
                  <th className="px-4 py-1 text-center md:px-6">닉네임</th>
                  <th className="px-4 py-1 text-center md:px-6">점수</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user, index) => (
                    <tr
                      key={user.userId}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="px-4 py-1 text-center text-gray-700 md:px-3">
                        {user.rankNo || index + 1}
                      </td>
                      <td className="flex justify-center px-2 py-1 md:px-3">
                        <img
                          src={user.profileImg}
                          alt={`${user.nickname}의 프로필`}
                          className="h-5 w-5 rounded-full border border-gray-300 object-cover md:h-7 md:w-7"
                        />
                      </td>
                      <td className="px-4 py-1 text-center font-medium text-gray-900 md:px-6">
                        {user.nickname}
                      </td>
                      <td className="px-4 py-1 text-center text-gray-700 md:px-6">
                        {user.userScore}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-2 py-2 text-center text-gray-500"
                    >
                      데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex w-full justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="small" // 크기 줄이기
              className="border-none text-blue-500"
            />
          </div>
        </>
      )}
    </div>
  );
};
