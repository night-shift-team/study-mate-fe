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
      className={`relative flex h-[62px] w-full items-center justify-between rounded-[18px] bg-[#1F1F1F] px-5 ${selected ? 'inner-border inner-border-point-orange' : ''}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      {children}
    </div>
  );
};
export default SelectAnswerRow;
