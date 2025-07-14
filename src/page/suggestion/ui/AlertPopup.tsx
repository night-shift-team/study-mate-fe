interface AlertPopupProps {
  title: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  hideCancel?: boolean;
}

export const BoardAlertPopup = ({
  title,
  confirmText,
  cancelText = '취소',
  onConfirm,
  onCancel,
  hideCancel = false,
}: AlertPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-center text-gray-800">{title}</p>
        <div className="flex justify-center gap-4">
          {!hideCancel && (
            <button
              onClick={onCancel}
              className="rounded bg-gray-200 px-4 py-2 text-sm"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-sm text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
