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
      }
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export default useAfterMaintenanceCheck;
