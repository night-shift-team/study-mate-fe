'use client';

interface AlertPopupProps {
  message: string;
  onClose: () => void;
}

export const AlertPopup = ({ message, onClose }: AlertPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <p className="mb-4 text-center text-base text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mx-auto block rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};
