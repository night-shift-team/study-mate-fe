import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoCardOutline } from 'react-icons/io5';
import { StoreItemInfo } from '.';

const CartPopupData = ({
  cart,
  setCart,
}: {
  cart: StoreItemInfo[];
  setCart: React.Dispatch<React.SetStateAction<StoreItemInfo[]>>;
}) => {
  const [, setIsMobile] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((acc, item) => acc + item.price * item.count, 0)
  );

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex max-h-[70vh] w-full flex-col items-center gap-2 overflow-y-auto py-2 text-xs md:text-sm">
        {cart.length
          ? cart.map((item, index) => (
              <div
                key={index}
                className={`flex w-full items-center justify-between gap-1`}
              >
                <div className="relative flex aspect-1 w-[clamp(2rem,10%,3rem)] scale-[1.3] items-center justify-center">
                  <Image src={item.imageUrl} alt={item.title} fill />
                </div>
                <span className="flex w-[clamp(3rem,30%,4rem)] font-semibold md:w-[clamp(3rem,45%,20rem)]">
                  {item.title + item.title + item.title}
                </span>
                <div className="flex w-[clamp(3rem,30%,5rem)] justify-between gap-1">
                  <button
                    className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
                    onClick={() =>
                      setCart((prev: StoreItemInfo[]) => {
                        const newCart: StoreItemInfo[] = [];

                        prev.map((cartItem) => {
                          if (cartItem.title === item.title) {
                            const newCount = cartItem.count - 1;
                            if (newCount > 0) {
                              newCart.push({ ...cartItem, count: newCount });
                            }
                          } else {
                            newCart.push(cartItem);
                          }
                        });
                        setTotalPrice(
                          newCart.reduce(
                            (acc, item) => acc + item.price * item.count,
                            0
                          )
                        );
                        return newCart;
                      })
                    }
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center whitespace-nowrap font-semibold">
                    {item.count}개
                  </span>
                  <button
                    className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] font-semibold hover:border hover:border-white"
                    onClick={() =>
                      setCart((prev: StoreItemInfo[]) => {
                        const newCart: StoreItemInfo[] = [];

                        prev.map((cartItem) => {
                          if (cartItem.title === item.title) {
                            const newCount = cartItem.count + 1;
                            if (newCount > 99) {
                              newCart.push({ ...cartItem, count: 99 });
                            } else {
                              newCart.push({ ...cartItem, count: newCount });
                            }
                          } else {
                            newCart.push(cartItem);
                          }
                        });
                        setTotalPrice(
                          newCart.reduce(
                            (acc, item) => acc + item.price * item.count,
                            0
                          )
                        );
                        return newCart;
                      })
                    }
                  >
                    +
                  </button>
                </div>
                <span className="flex w-[clamp(3.5rem,20%,4.5rem)]">
                  ₩{(item.price * item.count).toLocaleString('ko-KR')}
                </span>

                <button
                  className="flex aspect-1 h-5 items-center justify-center rounded-full bg-[#fbd34c] text-[0.6rem] font-semibold hover:border hover:border-white"
                  onClick={() => {
                    setCart((prev: StoreItemInfo[]) => {
                      const newCart: StoreItemInfo[] = [];
                      prev.map((cartItem) => {
                        if (cartItem.title === item.title) {
                          return;
                        } else {
                          newCart.push(cartItem);
                        }
                      });
                      setTotalPrice(
                        newCart.reduce(
                          (acc, item) => acc + item.price * item.count,
                          0
                        )
                      );
                      return newCart;
                    });
                  }}
                >
                  X
                </button>
              </div>
            ))
          : '장바구니가 비어있습니다.'}
      </div>
      {cart.length !== 0 ? (
        <button
          type="button"
          disabled={cart.length === 0}
          onClick={async () => {}}
          className={`mt-1 flex h-[2.4rem] w-[6.8rem] items-center justify-center rounded-2xl hover:border ${cart.length === 0 ? 'bg-gray-200 hover:border-none' : 'bg-amber-300'} px-4 font-parkdahyun hover:border-white md:mt-3 md:h-[2.8rem] md:w-[8rem] md:px-6 md:text-xl`}
        >
          <span className="flex items-center justify-between gap-2 tracking-tighter">
            {<IoCardOutline />}

            <span>{'₩' + totalPrice.toLocaleString('ko-KR')}</span>
          </span>
        </button>
      ) : null}
    </div>
  );
};
export default CartPopupData;
