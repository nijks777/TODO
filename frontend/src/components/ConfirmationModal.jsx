const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDangerous = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-6 border-2 border-orange-200 dark:border-gray-700 transform transition-all duration-300 animate-slideUp">
        <div className="mb-4 sm:mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base ${
              isDangerous
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
