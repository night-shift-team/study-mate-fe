'use client';
import React from 'react';

import { RouteTo } from '@/shared/routes/model/getRoutePath';
// import { userStore } from '@/shared/state/userStore/model';

import NewHeader from './newheader';
const Header = ({ path }: { path: string }) => {
  // const user = userStore.getState().user;

  if (path === RouteTo.ResetPassword) {
    return <NewHeader left="Back" center="None" right="None" />;
  } else if (path === RouteTo.ChangePassword) {
    return <NewHeader left="Back" center="None" right="None" />;
  } else if (path === RouteTo.Solve) {
    return <NewHeader left="None" center="StudyMate" right="Avartar" />;
  } else if (path === RouteTo.SolveSolution) {
    return <NewHeader left="Back" center="StudyMate" right="Avartar" />;
  } else if (path === RouteTo.Rank) {
    return <NewHeader left="None" center="StudyMate" right="None" />;
  } else if (path === RouteTo.Store) {
    return <NewHeader left="None" center="StudyMate" right="Avartar" />;
  } else if (path === RouteTo.StorePurchaseHistory) {
    return <NewHeader left="Back" center="StudyMate" right="Avartar" />;
  } else if (path === RouteTo.Announcement) {
    return <NewHeader left="None" center="StudyMate" right="None" />;
  } else if (path.startsWith(RouteTo.Announcement + '/')) {
    return <NewHeader left="Back" center="StudyMate" right="None" />;
  } else if (path === RouteTo.Mypage) {
    return <NewHeader left="None" center="StudyMate" right="DarkMode" />;
  } else if (path.startsWith(RouteTo.Suggestion)) {
    return <NewHeader left="Back" center="StudyMate" right="None" />;
  } else if (path.startsWith(RouteTo.LevelTestResult + '/')) {
    return <NewHeader left="Back" center="StudyMate" right="Avartar" />;
  } else if (path.startsWith(RouteTo.Mypage)) {
    return <NewHeader left="Back" center="StudyMate" right="Avartar" />;
  }
  return null;
};

export default Header;
