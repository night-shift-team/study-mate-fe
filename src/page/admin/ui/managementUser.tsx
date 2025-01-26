'use client';
import { useEffect, useState } from 'react';
import { UserTableForm } from './userTableForm';
import { UserData } from './userTableData';
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import { RiArrowRightDoubleLine } from 'react-icons/ri';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ManageUser = () => {
  const [findUserText, setFindUserText] = useState('');
  const [userList, setUserList] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNextListNum, setPageNextListNum] = useState(5);
  const [maxPage, setMaxPage] = useState(10);

  const findUsers = (findStr: string) => {
    if (findStr === '') {
      switch (currentPage) {
        case 1:
          setUserList(mockUserData);
          break;
        case 2:
          setUserList(mockUserData2);
          break;
        default:
          setUserList(mockUserData);
      }
      return;
    }
    const targetUsers = mockUserData.concat(mockUserData2).filter((user) => {
      if (user.username.includes(findStr)) {
        return user;
      }
    });
    console.log('targetUsers', targetUsers);
    setUserList(targetUsers);
  };

  useEffect(() => {
    if (currentPage === 1) {
      setUserList(mockUserData);
    } else if (currentPage === 2) {
      setUserList(mockUserData2);
    }
  }, [currentPage]);

  useEffect(() => {
    const debouncingCall = setTimeout(() => {
      findUsers(findUserText);
    }, 200);

    return () => {
      clearTimeout(debouncingCall);
    };
  }, [findUserText]);

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
            value={findUserText}
            onChange={(e) => setFindUserText(e.target.value)}
          ></input>
        </div>
        <div className="flex h-[70%] w-full px-[5%] pt-1.5">
          <UserTableForm userData={userList} />
        </div>
        <div className="flex h-fit w-full justify-center pt-[2%]">
          <div className="flex h-fit w-fit">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      setPageNextListNum((prev) => {
                        if (prev < 1) {
                          return prev;
                        } else {
                          setCurrentPage(prev - 4);
                          return prev - 5;
                        }
                      });
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: 5 }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + pageNextListNum + 1)}
                      isActive={pageNextListNum + i + 1 === currentPage}
                    >
                      {pageNextListNum + i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      setPageNextListNum((prev) => {
                        if (prev < maxPage - 5) {
                          setCurrentPage(prev + 10);
                          return prev + 5;
                        } else {
                          return prev;
                        }
                      });
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageUser;

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
const mockUserData2: UserData[] = [
  {
    username: 'user11',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user12',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user13',
    createdDt: '240531T00:14:32',
    solvedCount: 1,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user14',
    createdDt: '240531T00:14:32',
    solvedCount: 0,
    deletedDt: null,
  },
  {
    username: 'user15',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user16',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user17',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: '240531T00:14:32',
  },
  {
    username: 'user18',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user19',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
  {
    username: 'user20',
    createdDt: '240531T00:14:32',
    solvedCount: 10,
    deletedDt: null,
  },
];
