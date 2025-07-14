import {
  getValidNoticeListApi,
  GetValidnoticeListRes,
} from '@/feature/notice/api';

const useAfterMaintenanceCheck = async () => {
  try {
    const res = await getValidNoticeListApi();
    if (res.ok && res.payload) {
      const data = res.payload as GetValidnoticeListRes;
      const isMaintenance = data.isMaintenanceNoticeExist;

      if (isMaintenance) {
        return data;
      } else {
        // sessionStorage에 유효한 공지사항 저장
        if (data.isMaintenanceNoticeExist) {
          sessionStorage.setItem(
            'validNoticeList',
            JSON.stringify(data.displayNotices)
          );
        }
      }
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export default useAfterMaintenanceCheck;
