type PreviewProps = {
  onStart: () => void;
};

export const Preview = ({ onStart }: PreviewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">
        레벨 테스트에 오신 것을 환영합니다
      </h2>
      <button
        onClick={onStart}
        className="rounded-lg bg-blue-300 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-400"
      >
        레벨 테스트 시작하기
      </button>
    </div>
  );
};
