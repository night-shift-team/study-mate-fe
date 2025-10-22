type SelectAnswerRowProps = {
  bgColor?: string;
  selected?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const SelectAnswerRow = ({
  bgColor,
  selected = false,
  children,
  ...props
}: SelectAnswerRowProps) => {
  return (
    <div
      className={`relative flex min-h-[62px] w-full select-none items-center justify-between rounded-[18px] bg-grayscale-300 px-16p py-8p dark:bg-grayscale-850 ${selected ? 'inner-border inner-border-point-orange' : ''} `}
      style={{ backgroundColor: bgColor ?? '' }}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-between">
        {children}
      </div>
    </div>
  );
};
export default SelectAnswerRow;
