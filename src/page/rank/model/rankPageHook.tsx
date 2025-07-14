'use client';
import { useEffect, useState } from 'react';
import { getUserRankingApi, UserRankingRes } from '../api';
import Image from 'next/image';
import { BRONZE_IMG, GOLD_IMG, SLIVER_IMG } from './img';

const useRankPage = () => {
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

  return {
    myRanking,
    otherUsers,
    displayedUsers,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    userRankingDisplay,
    getScoreColor,
  };
};
export default useRankPage;
