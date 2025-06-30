'use client';

import { useEffect, useState } from 'react';
import { getUserRankingApi, UserRankingRes } from '../api';
import Pagination from '@mui/material/Pagination';
import Image from 'next/image';
import { GOLD_IMG, SLIVER_IMG, BRONZE_IMG } from '../model/img';
import { FaGithub } from 'react-icons/fa6';
import GoldTrophy from '@public/assets/backgroundImages/trophy/goldTrophy.jpeg';
import SilverTrophy from '@public/assets/backgroundImages/trophy/silverTrophy.jpg';
import BronzeTrophy from '@public/assets/backgroundImages/trophy/bronzeTrophy.jpg';
import { ProfileImage } from '@/shared/user/ui/profileImage';
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ProblemPagination } from '@/feature/pagination';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';

export const RankPageComponent = () => {
  const PAGE_LIMIT = 10;
  const [myRanking, setMyRanking] = useState<number | null>(null);
  const [otherUsers, setOtherUsers] = useState<UserRankingRes['otherUsers']>(
    []
  );
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

  const userRankingDisplay = (rank: number) => {
    if (rank === 1) {
      return <Image src={GOLD_IMG} alt="Gold" width={20} height={20} />;
    } else if (rank === 2) {
      return <Image src={SLIVER_IMG} alt="Silver" width={20} height={20} />;
    } else if (rank === 3) {
      return <Image src={BRONZE_IMG} alt="Bronze" width={20} height={20} />;
    }
    return rank; // 순위를 숫자로 반환
  };

  const getScoreColor = (score: number) => {
    if (score >= 256000) return 'text-black';
    if (score >= 128000) return 'text-purple-500';
    if (score >= 32000) return 'text-indigo-500';
    if (score >= 16000) return 'text-blue-500';
    if (score >= 8000) return 'text-green-500';
    if (score >= 4000) return 'text-yellow-500';
    if (score >= 2000) return 'text-orange-500';
    if (score >= 1000) return 'text-red-500';
    return 'text-gray-700';
  };

  return (
    <div className="flex h-full w-full max-w-4xl flex-col gap-2 rounded-2xl p-3">
      <div className="mt-2 flex h-[clamp(8rem,30%,12rem)] w-full min-w-[15rem] items-end justify-center gap-[0.1rem] px-[5%]">
        <div className="relative flex h-[86%] w-[10rem] animate-fade-up justify-center delay-500">
          {/* <span className='absolute top-[1.1rem] font-jalnan text-sm'>2</span> */}
          <Image
            src={SilverTrophy}
            alt="Gold"
            className="h-full w-full object-contain"
          />
          <div className="absolute bottom-0 flex h-[50%] w-[90%] flex-col items-center py-1 pt-2 font-parkdahyun text-xs">
            <div className="relative flex h-full w-full flex-col items-center">
              <ProfileImage
                src={
                  otherUsers && otherUsers.length
                    ? otherUsers[1].profileImg
                    : null
                }
                width={20}
                height={20}
                className="animate-fade-up"
              />
              {otherUsers.length >= 2 ? (
                <span className="w-[90%] animate-fade-up break-words pt-1 text-center leading-3 delay-200">
                  {otherUsers.length >= 1 ? otherUsers[1].nickname : ''}
                </span>
              ) : (
                ''
              )}
            </div>
            {otherUsers.length >= 2 ? (
              <span className="delay-400 animate-fade-up font-semibold text-stone-500">
                {otherUsers.length ? otherUsers[1].userScore : ''}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="relative flex h-full w-[10rem] animate-fade-up justify-center">
          {/* <span className='absolute pr-[0.15rem] top-[1rem] font-jalnan text-sm text-[0.8rem]'>1</span> */}
          <Image
            src={GoldTrophy}
            alt="Gold"
            className="h-full w-full object-contain"
          />
          <div className="absolute bottom-0 flex h-[55%] w-[90%] flex-col items-center py-1 pt-2 font-parkdahyun text-xs">
            <div className="relative flex h-full w-full flex-col items-center">
              <ProfileImage
                src={
                  otherUsers && otherUsers.length
                    ? otherUsers[0].profileImg
                    : null
                }
                width={20}
                height={20}
                className="animate-fade-up"
              />
              {otherUsers.length >= 2 ? (
                <span className="w-[90%] animate-fade-up break-words pt-1 text-center leading-3 delay-200">
                  {otherUsers[0].nickname}
                </span>
              ) : (
                ''
              )}
            </div>

            {otherUsers.length >= 2 ? (
              <span className="delay-400 animate-fade-up text-base font-bold text-red-500">
                {otherUsers.length ? otherUsers[0].userScore : ''}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="relative flex h-[80%] w-[10rem] animate-fade-up justify-center delay-1000">
          {/* <span className='absolute pl-[0.15rem] top-[0.94rem] font-jalnan text-sm text-[0.75rem]'>3</span> */}
          <Image
            src={BronzeTrophy}
            alt="Gold"
            className="h-full w-full object-contain"
          />
          <div className="absolute bottom-0 flex h-[50%] w-[90%] flex-col items-center py-1 font-parkdahyun text-xs">
            <div className="relative flex h-full w-full flex-col items-center">
              <ProfileImage
                src={otherUsers.length ? otherUsers[2].profileImg : null}
                width={20}
                height={20}
                className="animate-fade-up"
              />
              {otherUsers.length >= 2 ? (
                <span
                  className={`w-[90%] animate-fade-up break-words text-center leading-3 delay-200`}
                >
                  {otherUsers.length ? otherUsers[2].nickname : ''}
                </span>
              ) : (
                ''
              )}
            </div>
            {otherUsers.length >= 2 ? (
              <span className="delay-400 animate-fade-up font-semibold text-stone-500">
                {otherUsers.length ? otherUsers[2].userScore : ''}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="pt-40">
            <Spinner />
          </div>
        ) : (
          <>
            <h3 className="mt-5 animate-fade-up text-sm font-semibold text-gray-900 md:text-lg">
              나의 랭킹:{' '}
              <span
                className={
                  myRanking
                    ? myRanking <= 3
                      ? 'text-pointcolor-coral'
                      : ''
                    : ''
                }
              >
                {myRanking ?? '-'}등
              </span>
            </h3>

            <h3 className="mt-2 animate-fade-up text-sm font-medium text-gray-700 delay-200 md:text-sm">
              유저 랭킹
            </h3>
            <div className="delay-400 animate-fade-up">
              {/* 반응형 테이블 컨테이너 */}
              <TableContainer
                component={Paper}
                className="scrollbar-hide md:shadow-sm"
                sx={{
                  overflowY: 'auto',
                  borderRadius: 2,
                  backgroundColor: 'unset',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ width: '100%' }}
                  aria-label="ranking table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="w-[20%] !bg-pointcolor-beigebrown md:w-[10%]"
                        align="center"
                      >
                        순위
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                        className="!bg-pointcolor-beigebrown md:w-[20%]"
                        align="center"
                      >
                        프로필
                      </TableCell>
                      <TableCell
                        className="w-[50%] !bg-pointcolor-beigebrown"
                        align="center"
                      >
                        닉네임
                      </TableCell>
                      <TableCell
                        className="w-[30%] !bg-pointcolor-beigebrown md:w-[20%]"
                        align="center"
                      >
                        점수
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedUsers.length > 0 ? (
                      displayedUsers.map((user, index) => (
                        <TableRow
                          key={user.userId}
                          hover
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            className="place-items-center"
                          >
                            <Typography fontWeight="bold">
                              {userRankingDisplay(user.rankNo || index + 1)}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: 'none', md: 'table-cell' } }}
                            align="center"
                          >
                            <Avatar
                              alt={`${user.nickname}의 프로필`}
                              src={user.profileImg}
                              sx={{ width: 28, height: 28, mx: 'auto' }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              gap={1}
                            >
                              {user.nickname} <FaGithub />
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: getScoreColor(user.userScore) }}
                            className={`${user ? (user.rankNo === 1 ? '!text-red-500' : '') : ''}`}
                          >
                            {user.userScore}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography color="text.secondary">
                            데이터가 없습니다.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="h-full flex-1 pb-0.5" />
              {/* 페이지네이션 */}
              <div className="mt-4 flex w-full justify-center pb-2">
                <ProblemPagination
                  page={currentPage}
                  setPage={setCurrentPage}
                  paginationSize={totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
