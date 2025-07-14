import { useEffect, useState } from 'react';
import { buyStoreItemApi } from '../api';
import { openNewWindowWithoutDuplicate } from '@/shared/window/model/openWindow';

const useItemCard = (
  id: string,
  afterPaymentCallback: () => Promise<void> | void
) => {
  const [isMobile, setIsMobile] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const windowReference: Window | null = null;

  const buyItem = async () => {
    setPaymentOpen(true);
    try {
      const res = await buyStoreItemApi(id);
      if (res.ok) {
        const link = res.payload as string;
        openNewWindowWithoutDuplicate(
          windowReference,
          link,
          afterPaymentCallback
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPaymentOpen(false);
    }
  };
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  return { isMobile, buyItem, paymentOpen };
};
export default useItemCard;
