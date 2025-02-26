'use client';

import Link from 'next/link';

export const CategoryGridContents = ({
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
        className={`flex aspect-1 h-full flex-col rounded-[2rem] p-[5%] ${bgColor()} z-[1] items-center justify-center`}
      >
        <span className="flex whitespace-pre-wrap text-center">{title}</span>
        <span>{`(${count})`}</span>
      </div>
      <div className="absolute left-[3%] top-[3%] flex aspect-1 h-full rounded-[2rem] bg-[#D9D9D9]" />
    </Link>
  );
};
