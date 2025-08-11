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
    <div className="relative flex h-56p w-full shrink-0 items-center justify-center">
      <div className="absolute left-4 flex h-full items-center">{left}</div>
      <div className="flex h-full items-center">{center}</div>
      <div className="absolute right-4 flex h-full items-center">{right}</div>
    </div>
  );
};
export default NewHeader;
