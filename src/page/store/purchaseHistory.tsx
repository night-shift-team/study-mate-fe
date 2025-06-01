import Image from 'next/image';

const StorePurchaseHistoryPage = () => {
  const purchaseHistory = [
    {
      id: 1,
      date: '2025.06.01 14:22',
      items: [
        {
          id: 101,
          icon: '/shield.svg',
          title: '강화권 Lv1',
          count: 1,
          price: 2000,
          status: '구매 완료',
        },
        {
          id: 102,
          icon: '/shield.svg',
          title: '강화권 Lv2',
          count: 2,
          price: 4000,
          status: '사용 완료',
        },
      ],
    },
    {
      id: 2,
      date: '2025.05.28 10:05',
      items: [
        {
          id: 103,
          icon: '/shield.svg',
          title: '스킨 변경권',
          count: 1,
          price: 3000,
          status: '사용 중',
        },
        {
          id: 104,
          icon: '/shield.svg',
          title: '이름 변경권',
          count: 1,
          price: 1000,
          status: '환불 완료',
        },
      ],
    },
  ];

  return (
    <div className="absolute inset-0 z-[1] h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      <div className="flex w-full flex-col justify-center">
        <div className="mb-6 mt-8 text-center text-3xl font-bold text-[#222]">
          구매 내역
        </div>

        <div className="mx-auto mb-6 flex w-[90%] max-w-3xl flex-col gap-2 md:w-full md:gap-6">
          {purchaseHistory.map((purchase) => (
            <div
              key={purchase.id}
              className="mx-auto mb-6 flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-[#fef4dd] p-4 shadow-md"
            >
              {/* 구매일 */}
              <div className="flex w-full justify-between px-1 text-sm font-medium text-gray-500">
                <span>{purchase.date}</span>
                <span>주문번호 {purchase.id}</span>
              </div>

              {/* 아이템 목록 */}
              {purchase.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2rem_1fr_3rem_6rem_3rem] items-center border-b px-2 py-2 text-sm last:border-b-0 md:grid-cols-[2rem_1fr_3rem_6rem_6rem]"
                >
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={20}
                    height={20}
                    className="mx-auto"
                  />
                  <div>{item.title}</div>
                  <div className="text-center">{item.count}개</div>
                  <div className="text-center">
                    ₩ {item.price.toLocaleString()}
                  </div>
                  <div
                    className={`text-center text-xs font-medium ${
                      item.status === '구매 완료'
                        ? 'text-yellow-600'
                        : item.status === '사용 중'
                          ? 'text-green-600'
                          : item.status === '환불 완료'
                            ? 'text-red-500'
                            : 'text-gray-500'
                    }`}
                  >
                    {item.status}
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
              ))}

              <span className="flex w-full justify-end pr-3 text-sm">
                총 ₩
                {purchase.items
                  .reduce((total, item) => total + item.price, 0)
                  .toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StorePurchaseHistoryPage;
