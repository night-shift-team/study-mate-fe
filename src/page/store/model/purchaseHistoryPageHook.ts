'use client';
import { OrderDtoStatus } from '@/shared/api/autoGenerateTypes';
import { useEffect, useState } from 'react';
import { getStorePaymentHistoryApi, PaymentHistoryApiRes } from '../api';

const usePurchaseHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryApiRes>();

  const getMyPaymentHistory = async () => {
    try {
      const res = await getStorePaymentHistoryApi(0, 999);
      if (res.ok) {
        const data = res.payload as PaymentHistoryApiRes;
        data.content.sort(
          (a, b) =>
            new Date(b.paymentDate).getTime() -
            new Date(a.paymentDate).getTime()
        );
        setPaymentHistory(data);
      }
      throw res.payload;
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderStatusStringKr = (status: OrderDtoStatus) => {
    switch (status) {
      case OrderDtoStatus.PAID:
        return '구매 완료';
      case OrderDtoStatus.PENDING:
        return '구매 대기';
      case OrderDtoStatus.REQUEST:
        return '결제 요청';
      case OrderDtoStatus.PAY_ALL_CANCELLED:
        return '결제 취소';
      case OrderDtoStatus.PAY_PARTIAL_CANCELLED:
        return '부분 취소';
      case OrderDtoStatus.REQ_CANCELLED:
        return '요청 취소';
      case OrderDtoStatus.FAILED:
        return '결제 취소';
      default:
        return '구매 대기';
    }
  };

  useEffect(() => {
    getMyPaymentHistory();
  }, []);

  return { paymentHistory, getOrderStatusStringKr };
};
export default usePurchaseHistoryPage;
