import { getRoutePath } from '@/shared/model/getRoutePath';
import Link from 'next/link';

const SolveProblem = () => {
  return (
    <div className="flex h-full w-full flex-col px-[6rem] py-[8rem]">
      <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[25%] items-center justify-center px-[0.5rem] text-[3vh]">
          Computer Science
        </div>
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-start gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="운영체제" count={152} />
            <CategoryGridContents title="데이터베이스" count={152} />
            <CategoryGridContents title="네트워크" count={152} />
            <CategoryGridContents title={`자료구조와\n알고리즘`} count={152} />
          </div>
        </div>
      </div>
      <div className="flex h-[50%] w-full">
        <div className="flex h-full w-[75%] px-[3rem] py-[3rem]">
          <div className="grid h-full w-full grid-flow-col justify-end gap-x-[3rem] overflow-x-scroll py-[0.3rem] scrollbar-hide">
            <CategoryGridContents title="Javascript" count={152} />
            <CategoryGridContents title="React" count={152} />
            <CategoryGridContents title="Nextjs" count={152} />
          </div>
        </div>
        <div className="flex h-full w-[25%] items-center justify-center px-[0.5rem] text-[3vh]">
          Frontend
        </div>
      </div>
    </div>
  );
};
export default SolveProblem;

const CategoryGridContents = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => {
  const bgColor = () => {
    switch (title) {
      case 'Javascript':
      case 'React':
      case 'Nextjs':
        return 'bg-[#f0edd4]';
      default:
        return 'bg-[#f9fbe7]';
    }
  };
  return (
    <Link
      className="relative mx-[0.5rem] flex h-full w-fit text-[2.5vh]"
      href={`/solve/${title}`}
    >
      <div
        className={`flex aspect-square h-full flex-col rounded-[2rem] p-[5%] ${bgColor()} z-[1] items-center justify-center`}
      >
        <span className="flex whitespace-pre-wrap text-center">{title}</span>
        <span>{`(${count})`}</span>
      </div>
      <div className="absolute left-[3%] top-[3%] flex aspect-square h-full rounded-[2rem] bg-[#D9D9D9]" />
    </Link>
  );
};
