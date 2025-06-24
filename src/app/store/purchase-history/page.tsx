import { PaymentHistoryApiRes } from '@/page/store/api';
import StorePurchaseHistoryPage from '@/page/store/purchaseHistory';
import PageAnimationWrapper from '@/shared/style/ui/pageAnimationWrapper';

const StorePurchaseHistory = async () => {
  return (
    <PageAnimationWrapper>
      <StorePurchaseHistoryPage />
    </PageAnimationWrapper>
  );
};
export default StorePurchaseHistory;
