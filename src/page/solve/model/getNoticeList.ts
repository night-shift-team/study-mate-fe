import { getAllNoticeListApi, getAllNoticeListRes } from '@/feature/notice/api';

export const getNoticeList = async () => {
  try {
    const res = await getAllNoticeListApi(0, 99999);
    if (res.ok) {
      return (res.payload as getAllNoticeListRes).content;
    }
  } catch (e) {
    console.log(e);
  }
};
