type SelectAnswerRowProps = {
  bgColor?: string;
  selected?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const SelectAnswerRow = ({
  bgColor = '#1F1F1F',
  selected = false,
  children,
  ...props
}: SelectAnswerRowProps) => {
  return (
    <div
      className={`relative flex h-[62px] w-full shrink-0 select-none items-center justify-between rounded-[18px] bg-[#1F1F1F] px-16p py-8p ${selected ? 'inner-border inner-border-point-orange' : ''} `}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-between overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
export default SelectAnswerRow;
