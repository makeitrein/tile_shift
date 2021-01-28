import { Transition } from "@headlessui/react";

export const Slideover = ({
  isOpen,
  closeDrawer,
  title,
  description,
  children,
}) => {
  return (
    <>
      {/* <div className="fixed inset-0 overflow-hidden"> */}
      {/* <div className="absolute inset-0 overflow-hidden"> */}
      <Transition
        show={isOpen}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed z-force inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
        aria-labelledby="slide-over-heading"
      >
        <div className="w-screen max-w-lg">
          <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div className="flex-1">
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <h2
                      id="slide-over-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="h-7 flex items-center">
                    <span
                      onClick={closeDrawer}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 relative h-full px-6">
                {children}
              </div>
            </div>
            <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
              <div className="space-x-3 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </Transition>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
