'use client';

const NewHeader = ({
  left,
  center,
  right,
}: {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <div className="flex h-56p w-full shrink-0 items-center justify-between px-4 py-2">
      {left}
      {center}
      {right}
    </div>
  );
};
export default NewHeader;
