'use client';

import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import usePurchaseHistoryPage from '../model/purchaseHistoryPageHook';
import { OrderList } from './orderList';

const StorePurchaseHistoryPage = () => {
  const { paymentHistory } = usePurchaseHistoryPage();
  return (
    <div
      className="flex h-[100vh] w-full flex-col gap-2 overflow-scroll p-16p"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="font-pixel text-3xl font-bold text-black dark:text-white">
        My Orders
      </div>

      <div className="mb-6 flex flex-col gap-2">
        {paymentHistory ? (
          paymentHistory.content.length > 0 ? (
            paymentHistory.content.map((order) => (
              <div key={order.orderId}>
                <OrderList
                  title={order.itemName}
                  time={order.paymentDate.split('T').join(' ')}
                  price={order.price.toLocaleString()}
                  count="1"
                  // status={getOrderStatusStringKr(order.status)}
                />
              </div>
            ))
          ) : (
            <span className="flex w-full justify-center">
              구매 내역이 없습니다
            </span>
          )
        ) : (
          <div className="w-full">
            <Spinner size="md" color="#fff" />
          </div>
        )}
      </div>
    </div>
  );
};
export default StorePurchaseHistoryPage;
