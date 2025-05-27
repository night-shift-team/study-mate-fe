import Panel from '@public/assets/backgroundImages/store/storePanel2.svg';
import Image from 'next/image';
import ItemCard from './storeItemCard';
import ShieldIcon from '@public/assets/icons/store/shieldIcon3.png';
import PurchaseHistory from '@public/assets/icons/store/purchaseHistory.png';
import Link from 'next/link';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

const StorePage = () => {
  return (
    <div className="absolute inset-0 h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="mt-4 flex h-[8rem] w-full justify-center">
          <Panel className="h-full w-full scale-[1.45] object-contain" />
        </div>
        <Link
          aria-label="purchase_history"
          href={RouteTo.StorePurchaseHistory}
          className="absolute right-5 top-4 flex h-[5rem] w-[3.6rem] flex-col"
        >
          <div className="relative flex h-full w-full">
            <div className="absolute flex aspect-1 w-full">
              <Image src={PurchaseHistory} fill alt="purchase_history" />
            </div>
            <span className="tracking-tights absolute bottom-4 flex w-full justify-center text-[0.65rem]">
              구매 내역
            </span>
          </div>
        </Link>
        <div className="mt-5 grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] place-items-center gap-4 px-6 pb-20 md:mt-10 md:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] md:gap-10 md:px-40">
          {Array.from({ length: 10 }).map((_, index) => (
            <ItemCard
              key={index}
              title={'Title'}
              description="24시간,문제풀이,방어"
              imageUrl={ShieldIcon}
              price={2000}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default StorePage;
