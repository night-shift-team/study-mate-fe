interface ProgressBarProps {
  currentProgress: number;
  totalProgress: number;
}

export const ProgressBar = ({
  currentProgress,
  totalProgress,
}: ProgressBarProps) => {
  const percentage = Math.min((currentProgress / totalProgress) * 100, 100);
  const remaining = 100 - percentage;

  return (
    <div className="flex w-full items-center gap-1 overflow-hidden bg-black">
      <div
        className="h-[4px] rounded-md bg-point-orange transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <div
        className="h-[4px] rounded-md bg-white transition-all duration-300"
        style={{ width: `${remaining}%` }}
      />
    </div>
  );
};
