type SelectAnswerRowProps = {
  selected?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const SelectAnswerRow = ({
  selected = false,
  children,
  ...props
}: SelectAnswerRowProps) => {
  return (
    <div
      className={`relative flex h-[62px] w-full items-center justify-between rounded-[18px] bg-[#1F1F1F] px-5 ${selected ? 'border border-point-orange' : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default SelectAnswerRow;
