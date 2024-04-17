const ConfirmationModal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="text-lg">{children}</div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-black"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
  