'use client';
import { useEffect, useState } from 'react';
import { UserData } from '../ui/userTableData';
import { mockUserData, mockUserData2 } from './mockDatas';

const useManageUserPage = () => {
  const [findUserText, setFindUserText] = useState('');
  const [userList, setUserList] = useState<UserData[]>([]);
  const [currentPage] = useState(1);

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
    setUserList(targetUsers);
  };

  useEffect(() => {
    const debouncingCall = setTimeout(() => {
      findUsers(findUserText);
    }, 200);

    return () => {
      clearTimeout(debouncingCall);
    };
  }, [findUserText]);

  return { findUserText, setFindUserText, userList };
};
export default useManageUserPage;
