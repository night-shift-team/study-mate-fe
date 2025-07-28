'use client';
import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { PopupNotice } from '@/shared/popUp/ui/popupV2';
import { Spinner } from '@/feature/spinner/ui/spinnerUI';
import useStorePage from '../model/storePageHook';
import PurchasePopupData from './purchasePopup';
import ItemCard from './storeItemCard';
import useItemCard from '../model/itemCardHook';

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
    cartOpen,
    setCartOpen,
    storeItems,
    updateBuyingStatusSuccess,
    cart,
    setCart,
    setPurchaseOpen,
    purchaseStatus,
  } = useStorePage();

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
  console.log(purchaseOpen, 'purchaseOpen');

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
        {purchaseStatus !== 'none' ? (
          <div className="mt-4 flex h-[8rem] w-full animate-fade-up items-center justify-center">
            {/* <Panel className="h-full w-full scale-[1.45] object-contain" /> */}
            <div className="flex flex-col text-white">
              <span className="text-[24px] font-bold">
                {lastPurchasedItem?.title}을 <br />
                새롭게 생성했어요!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex h-[8rem] w-full animate-fade-up">
            {/* <Panel className="h-full w-full scale-[1.45] object-contain" /> */}
            <div className="flex w-full flex-col text-white">
              <div className="flex w-full justify-between font-pixel text-[32px] font-bold">
                Welcome to store!
                <Link
                  aria-label="purchase_history"
                  href={RouteTo.StorePurchaseHistory}
                >
                  <span className="text-[16px]">Storage</span>
                </Link>
              </div>
              <span className="w-[200px]">
                아이템을 모아 레벨업! 당신의 학습 여정을 강화하세요.
              </span>
            </div>
          </div>
        )}

        <div className="flex w-full flex-col justify-center p-16p">
          <div className="w-full rounded-xl bg-white">
            {purchaseStatus !== 'none' ? (
              <>
                {selectedItem ? (
                  <div className="flex w-full flex-col justify-center gap-4 p-32p">
                    <h2 className="text-center text-[18px] font-bold">
                      제한없이 마음껏 문제 풀기!
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
                  <div className="flex w-full flex-col gap-4 p-32p">
                    <div className="flex flex-col text-left">
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
                      className="h-[40px] rounded-xl bg-point-orange font-pixel text-[20px] font-bold"
                      onClick={async () => {
                        if (!selectedItem) return;
                        await buyItem();
                        await selectedItem.afterPaymentCallback?.();
                        setLastPurchasedItem(selectedItem);
                      }}
                    >
                      {paymentOpen ? (
                        <Spinner color="#fff" size="sm" />
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
          {purchaseStatus !== 'none' && (
            <Link href={RouteTo.StorePurchaseHistory}>
              <button className="mt-5 h-[40px] w-full rounded-xl bg-point-orange font-pixel text-[20px] font-bold">
                Go to Storage
              </button>
            </Link>
          )}

          {purchaseStatus === 'none' && (
            <>
              {storeItems.length > 0 ? (
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
                      onClick={() =>
                        setSelectedItem({
                          id: item.itemId,
                          title: item.itemName,
                          imageUrl: item.itemImage,
                          price: item.priceKrw,
                          description: item.itemDescription,
                          afterPaymentCallback: async () => {
                            await updateBuyingStatusSuccess();
                          },
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-full w-full justify-center pb-[10%]">
                  <Spinner size="lg" color="#fff" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default StorePage;
