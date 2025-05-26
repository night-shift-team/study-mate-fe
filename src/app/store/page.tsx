import Panel from '@public/assets/backgroundImages/store/storePanel.png';
import Image from 'next/image';
import ItemCard from './storeItemCard';
const StorePage = () => {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-storeBg bg-cover pt-[3.2rem] md:pt-[3.5rem]">
      <div className="flex h-full w-full flex-col overflow-y-auto scrollbar-hide">
        <div className="mt-4 flex h-[8rem] w-full justify-center">
          <Image
            src={Panel}
            alt="panel"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-10 grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] place-items-center gap-10 pb-20 md:px-20">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
};
export default StorePage;
