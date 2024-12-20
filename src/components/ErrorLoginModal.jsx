const ErrorLoginModal = ({ setShowErrorModal, children }) => {

  function handleCloseErrorModal() {
    setShowErrorModal(false);
  }

  return (
    <div
      id="editMemberModal"
      className="relative z-10 ml-[40px]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-[600px] sm:my-8 sm:p-6">
            <div className="mt-3 text-center sm:mt-5 text-sm montserrat">
              <h3
                className=" font-semibold lg:text-base leading-6 text-gray-900"
                id="modal-title"
              >
                Access denied.
              </h3>
              <p className="text-base">Please, request access to login.</p>
            </div>
            <div className="mt-5 flex justify-center">
              <button
                className="min-w-[120px] mr-2 rounded-lg bg-transparent px-3 py-2 border-2 border-[#243570] text-base font-semibold text-[#243570] shadow-sm hover:text-[#535787]"
                onClick={handleCloseErrorModal}
              >
                Close
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorLoginModal;
