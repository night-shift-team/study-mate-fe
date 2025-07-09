'use client';
import Panel from '@public/assets/backgroundImages/store/storePanel2.svg';
import Image, { StaticImageData } from 'next/image';
import ItemCard from './ui/storeItemCard';
import PurchaseHistory from '@public/assets/icons/store/purchaseHistory.png';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import React, { useEffect, useState } from 'react';
import { PopupNotice } from '@/shared/popUp/ui/popupV2';
import useOutsideClick from '@/shared/routes/model/useOutsideClick';

import CartPopupData from './ui/cartPopup';
import PurchasePopupData from './ui/purchasePopup';
import { getStoreItemListApi, getStorePaymentHistoryApi } from './api';
import {
  PageResponseDtoOrderDto,
  PageResponseDtoStoreItemDto,
  StoreItemDto,
} from '@/shared/api/autoGenerateTypes';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useToast, { ToastType } from '@/shared/toast/toast';
import { ServerErrorResponse } from '@/shared/api/model/config';

export interface StoreItemInfo {
  title: string;
  imageUrl: string | StaticImageData;
  price: number;
  count: number;
}
export type PurchaseStatus = 'success' | 'fail' | 'none';

const StorePage = () => {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>('none');
  const outSideClickRef = useOutsideClick(() => {
    setPurchaseOpen(false);
    setCartOpen(false);
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItemInfo | null>(null);
  const [cart, setCart] = useState<StoreItemInfo[]>([]);
  const [storeItems, setStoreItems] = useState<StoreItemDto[]>([]);
  const { Toaster, setToastDescription } = useToast(toastOpen, setToastOpen);

  const getStoreItemLists = async () => {
    try {
      const res = await getStoreItemListApi(0, 99);
      if (res.ok) {
        const data = res.payload as PageResponseDtoStoreItemDto;
        if ('content' in data && data.content) {
          setStoreItems(data.content);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const tryCount = 1;
  const updateBuyingStatusSuccess = async () => {
    const currentTime = Date.now();
    try {
      for (let i = 0; i < tryCount; i++) {
        const res = await getStorePaymentHistoryApi(0, 999);
        if (res.ok) {
          const historyByLatest = (
            res.payload as PageResponseDtoOrderDto
          ).content.sort(
            (a, b) =>
              new Date(b.paymentDate).getTime() -
              new Date(a.paymentDate).getTime()
          );
          if (historyByLatest[0]) {
            const latestPaymentTime = new Date(
              historyByLatest[0].paymentDate
            ).getTime();
            if (currentTime - latestPaymentTime < 30000) {
              // 결제하고 결제내역 호출했는데 가장 최근 내역이 30초 전보다 더 전이면 데이터가 들어오지 않은걸로 간주
              setPurchaseStatus('success');
              setToastDescription(
                `${historyByLatest[0].itemName} 아이템 구매 완료`
              );
              setToastOpen(true);
              return;
            }
          }
        } else {
          throw res.payload as ServerErrorResponse;
        }
      }
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setPurchaseStatus('none');
      setPurchaseOpen(false);
      setSelectedItem(null);
    }, 3000);
  };

  useEffect(() => {
    getStoreItemLists();
  }, []);

  return (
    <div className="absolute inset-0 z-[1] h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      {purchaseOpen ? (
        <PopupNotice
          ref={outSideClickRef}
          size="sm"
          title="아이템 구매"
          content={
            <PurchasePopupData
              item={selectedItem}
              setItem={setSelectedItem}
              setCart={setCart}
              popupClose={() => setPurchaseOpen(false)}
            />
          }
          onClose={() => setPurchaseOpen(false)}
          color="#ffffe9"
        />
      ) : null}
      {cartOpen ? (
        <PopupNotice
          ref={outSideClickRef}
          size="md"
          title="장바구니"
          content={<CartPopupData cart={cart} setCart={setCart} />}
          onClose={() => setCartOpen(false)}
          color="#ffffe9"
        />
      ) : null}
      {/* 구매 여부 체크 필요 */}
      {purchaseStatus !== 'none' ? (
        <Toaster
          status={
            purchaseStatus === 'success' ? ToastType.success : ToastType.error
          }
        />
      ) : null}
      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="mt-4 flex h-[8rem] w-full animate-fade-up justify-center">
          <Panel className="h-full w-full scale-[1.45] object-contain" />
        </div>
        {/* <button
          aria-label="cart"
          className="group fixed right-2 top-12 flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-16 md:h-[3.8rem] md:w-[3.6rem]"
          onClick={() => setCartOpen(true)}
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={CartIcon} fill alt="cart_icon" />
            </div>
            <div className="absolute bottom-2 right-1 flex aspect-1 h-3.5 items-center justify-center rounded-full bg-[#ef4444] text-[0.6rem] font-semibold text-white group-hover:border group-hover:border-white/50 md:bottom-[0.65rem] md:right-1.5 md:h-[1.1rem] md:text-[0.65rem]">
              {cart.length}
            </div>
            <span className="absolute -bottom-[0.1rem] flex w-full justify-center text-[0.5rem] tracking-tighter md:text-[0.65rem] md:tracking-tight">
              장바구니
            </span>
          </div>
        </button> */}
        {/* <Link
          aria-label="purchase_history"
          href={RouteTo.StorePurchaseHistory}
          className="fixed right-2 top-[6.3rem] flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-32 md:h-[3.8rem] md:w-[3.6rem]"
        > */}
        <Link
          aria-label="purchase_history"
          href={RouteTo.StorePurchaseHistory}
          className="fixed right-2 top-12 flex h-[3rem] w-[2.8rem] flex-col md:right-5 md:top-16 md:h-[3.8rem] md:w-[3.6rem]"
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={PurchaseHistory} fill alt="purchase_history" />
            </div>
            <span className="absolute -bottom-[0.1rem] flex w-full justify-center text-[0.5rem] tracking-tighter md:text-[0.65rem] md:tracking-tight">
              구매내역
            </span>
          </div>
        </Link>
        {storeItems.length > 0 ? (
          <div className="md:px-18 mt-5 grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] place-items-center gap-4 px-3 pb-20 sm:px-10 md:mt-10 md:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] md:gap-10 lg:px-32">
            {storeItems.map((item, index) => (
              <ItemCard
                key={index}
                index={index}
                id={item.itemId}
                title={item.itemName}
                description={item.itemDescription}
                imageUrl={item.itemImage}
                price={item.priceKrw}
                afterPaymentCallback={async () =>
                  await updateBuyingStatusSuccess()
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full justify-center pb-[10%]">
            <Spinner size="lg" color="#fff" />
          </div>
        )}
      </div>
    </div>
  );
};
export default StorePage;
