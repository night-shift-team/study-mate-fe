'use client';
import Image from 'next/image';
import { getStorePaymentHistoryApi, PaymentHistoryApiRes } from './api';
import { OrderDtoStatus } from '@/shared/api/autoGenerateTypes';
import { useEffect, useState } from 'react';

const StorePurchaseHistoryPage = () => {
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

  return (
    <div className="absolute inset-0 z-[1] h-screen w-screen overflow-auto bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      <div className="flex w-full flex-col justify-center">
        <div className="mb-6 mt-8 text-center text-3xl font-bold text-[#222]">
          구매 내역
        </div>

        <div className="mx-auto mb-6 flex w-[90%] max-w-3xl flex-col gap-2 md:w-full md:gap-6">
          {paymentHistory
            ? paymentHistory.content.map((order) => (
                <div
                  key={order.orderId}
                  className="mx-auto mb-6 flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-[#fef4dd] p-4 shadow-md"
                >
                  {/* 구매일 */}
                  <div className="flex w-full justify-between px-1 text-sm font-medium text-gray-500">
                    <span>{order.paymentDate.split('T').join(' ')}</span>
                    <span>주문번호 {order.orderId.split('-')[0]}</span>
                  </div>

                  {/* 아이템 목록 */}
                  <div className="grid grid-cols-[2rem_1fr_3rem_6rem_3rem] items-center border-b px-2 py-2 text-sm last:border-b-0 md:grid-cols-[2rem_1fr_3rem_6rem_6rem]">
                    <Image
                      src={'/assets/icons/header/mascotIcon.svg'}
                      alt="icon"
                      width={20}
                      height={20}
                      onError={(e) => {
                        e.currentTarget.src =
                          '/assets/icons/header/mascotIcon.svg';
                      }}
                      className="mx-auto"
                      priority
                    />
                    <div>{order.itemName}</div>
                    <div className="text-center">{1}개</div>
                    <div className="text-center">
                      ₩ {order.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-center text-xs font-medium ${
                        order.status === OrderDtoStatus.PENDING
                          ? 'text-yellow-600'
                          : order.status === OrderDtoStatus.PAID
                            ? 'text-green-600'
                            : order.status === OrderDtoStatus.FAILED
                              ? 'text-red-500'
                              : 'text-gray-500'
                      }`}
                    >
                      {getOrderStatusStringKr(order.status)}
                    </div>
                    {/* <div className="text-center">
                  <button
                    // onClick={() => item.status === '구매 완료' && handleRefund(item.id)}
                    // disabled={item.status !== '구매 완료'}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      item.status === '구매 완료'
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    환불
                  </button>
                </div> */}
                  </div>

                  {/* <span className="flex w-full justify-end pr-3 text-sm">
                총 ₩
                {purchase.items
                  .reduce((total, item) => total + item.price, 0)
                  .toLocaleString()}
              </span> */}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default StorePurchaseHistoryPage;
