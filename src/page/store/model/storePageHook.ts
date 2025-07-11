'use client';
import {
  PageResponseDtoOrderDto,
  PageResponseDtoStoreItemDto,
  StoreItemDto,
} from '@/shared/api/autoGenerateTypes';
import { ServerErrorResponse } from '@/shared/api/model/config';
import { useEffect, useState } from 'react';
import { getStoreItemListApi, getStorePaymentHistoryApi } from '../api';
import useToast from '@/shared/toast/model/toastHook';
import { PurchaseStatus, StoreItemInfo } from '../ui';
import useOutsideClick from '@/shared/routes/model/useOutsideClick';

const useStorePage = () => {
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

  return {
    purchaseOpen,
    outSideClickRef,
    selectedItem,
    setSelectedItem,
    cartOpen,
    setCartOpen,
    storeItems,
    updateBuyingStatusSuccess,
    cart,
    setCart,
    setPurchaseOpen,
    purchaseStatus,
    Toaster,
  };
};
export default useStorePage;
