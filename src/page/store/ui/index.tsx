'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { PopupNotice } from '@/shared/popUp/ui/popupV2';
import useStorePage from '../model/storePageHook';
import PurchasePopupData from './purchasePopup';
import ItemCard from './storeItemCard';
import useItemCard from '../model/itemCardHook';
import { SvgIcon } from '@mui/material';
import Arrow from '@public/assets/icons/button/check/Polygon.svg';
import DarkPolygon from '@public/assets/icons/button/check/DarkPolygon.svg';
import { pageLoaderStore } from '@/shared/state/spinner/pageLoader';
import { ComponentLoader } from '@/feature/spinner/ui/componentLoader';

export interface StoreItemInfo {
  id?: string;
  title: string;
  imageUrl: string | StaticImageData;
  price: number;
  count?: number;
  description?: string;
  afterPaymentCallback?: () => Promise<void>;
}
export type PurchaseStatus = 'success' | 'fail' | 'none';

const StorePage = () => {
  const {
    purchaseOpen,
    outSideClickRef,
    selectedItem,
    setSelectedItem,

    storeItems,
    updateBuyingStatusSuccess,
    setCart,
    setPurchaseOpen,
    purchaseStatus,
  } = useStorePage();

  const getPageLoader = pageLoaderStore((s) => s.status);
  const setPageLoader = pageLoaderStore((s) => s.setStatus);

  useLayoutEffect(() => {
    setPageLoader('loading');
    console.log('page loader status:', getPageLoader);
  }, []);

  useEffect(() => {
    if (storeItems.length > 0 && !selectedItem) {
      const firstItem = storeItems[0];
      setSelectedItem({
        title: firstItem.itemName,
        imageUrl: firstItem.itemImage,
        price: firstItem.priceKrw,
        description: firstItem.itemDescription,
      });
    }
  }, [storeItems, selectedItem, setSelectedItem]);

  const { buyItem, paymentOpen } = useItemCard(
    selectedItem?.id ?? '',
    updateBuyingStatusSuccess
  );
  console.log('purchaseOpen', purchaseOpen, 'purchaseStatus', purchaseStatus);

  const [lastPurchasedItem, setLastPurchasedItem] =
    useState<StoreItemInfo | null>(null);

  return (
    <div className="w-full">
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

      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden pb-[80px] pl-16p pr-16p scrollbar-hide">
        {purchaseStatus === 'success' ? (
          <div className="mt-2 flex h-[8rem] w-full animate-fade-up items-center justify-center">
            {/* <Panel className="h-full w-full scale-[1.45] object-contain" /> */}
            <div className="flex flex-col text-black dark:text-white">
              <span className="text-[24px] font-bold">
                {lastPurchasedItem?.title}을 <br />
                새롭게 획득했어요!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex h-[8rem] w-full animate-fade-up">
            {/* <Panel className="h-full w-full scale-[1.45] object-contain" /> */}
            <div className="flex w-full flex-col text-black dark:text-white">
              <div className="flex w-full justify-between font-pixel text-[32px] font-bold">
                Welcome to store!
              </div>
              <span className="w-[200px]">
                아이템을 모아 레벨업! 당신의 학습 여정을 강화하세요.
              </span>
              <Link
                aria-label="purchase_history"
                href={RouteTo.StorePurchaseHistory}
                className="w-full text-right"
              >
                <div className="flex justify-end gap-2 font-pixel text-[20px] font-bold">
                  <span>Go to Storage</span>

                  <div className="relative h-[15px] w-[15px]">
                    <SvgIcon
                      component={Arrow}
                      inheritViewBox
                      className="absolute left-0 top-2 block dark:hidden"
                      sx={{ width: 15, height: 15 }}
                    />
                    <SvgIcon
                      component={DarkPolygon}
                      inheritViewBox
                      className="absolute left-0 top-2 hidden dark:block"
                      sx={{ width: 15, height: 15 }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <div className="flex w-full flex-col justify-center">
          <div className="w-full rounded-xl border-[1.5px] border-black bg-white">
            {purchaseStatus === 'success' ? (
              <>
                {selectedItem ? (
                  <div className="flex w-full flex-col justify-center gap-4 p-32p">
                    <h2 className="text-center text-[18px] font-bold">
                      {selectedItem.description}
                    </h2>
                    <div className="flex w-full justify-center">
                      <Image
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        width={130}
                        height={130}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {selectedItem ? (
                  <div className="flex w-full flex-col gap-4 rounded-xl p-32p">
                    <div className="flex flex-col text-left text-black">
                      <h2 className="text-[24px] text-lg font-bold">
                        {selectedItem.title}
                      </h2>
                      <p className="text-[16px]">{selectedItem.description}</p>
                    </div>
                    <div className="flex w-full justify-center">
                      <Image
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        width={130}
                        height={130}
                      />
                    </div>

                    <button
                      className={`h-[40px] rounded-xl ${paymentOpen ? 'bg-grayscale-400' : 'bg-point-orange'} font-pixel text-[20px] font-bold text-black dark:text-white`}
                      disabled={paymentOpen}
                      onClick={async () => {
                        if (!selectedItem) return;
                        await buyItem();
                        await selectedItem.afterPaymentCallback?.();
                        setLastPurchasedItem(selectedItem);
                      }}
                    >
                      {paymentOpen ? (
                        <div className="flex w-full justify-center">
                          <ComponentLoader color="#fff" size="md" />
                        </div>
                      ) : (
                        'Buy now'
                      )}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {purchaseStatus === 'success' && (
            <Link href={RouteTo.StorePurchaseHistory}>
              <button className="mt-5 h-[40px] w-full rounded-xl bg-point-orange font-pixel text-[20px] font-bold">
                Go to Storage
              </button>
            </Link>
          )}
          <div className="mt-5 flex gap-3">
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
                isSelected={selectedItem?.title === item.itemName}
                onClick={() => {
                  if (purchaseStatus === 'success') return;
                  setSelectedItem({
                    id: item.itemId,
                    title: item.itemName,
                    imageUrl: item.itemImage,
                    price: item.priceKrw,
                    description: item.itemDescription,
                    afterPaymentCallback: async () => {
                      await updateBuyingStatusSuccess();
                    },
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StorePage;
