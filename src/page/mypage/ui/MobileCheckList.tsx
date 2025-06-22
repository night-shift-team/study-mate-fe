interface MobileCheckListProps {
  bg: string;
  title: string;
}

export const MobileCheckList = ({ bg, title }: MobileCheckListProps) => {
  return (
    <div
      className={`relative h-[25vh] rounded-xl ${bg} p-4 shadow-md md:hidden`}
    >
      {/* <div
        className={`absolute -top-4 left-[0px] h-[40px] w-[60px] rounded-t-lg ${bg}`}
      ></div> */}
      <div className="mt-4 font-semibold text-black">{title}</div>
      <div className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-black">
        <span className="text-white">&rarr;</span>
      </div>
    </div>
  );
};
