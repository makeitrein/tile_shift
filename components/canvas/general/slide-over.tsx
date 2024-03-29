import { Transition } from "@headlessui/react";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { hoveringOverScrollable } from "../../state/ui";

interface Props {
  isOpen: boolean;
  closeDrawer: () => void;
  title: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  description: React.ReactNode;
}
export const Slideover = React.memo(
  ({ isOpen, closeDrawer, title, body, description, footer }: Props) => {
    const setHoveringOverScrollable = useSetRecoilState(hoveringOverScrollable);
    const setIsHovering = useCallback(
      (hovering) => setHoveringOverScrollable(hovering),
      []
    );
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
          className="fixed z-force inset-y-0 right-0 max-w-full flex  overflow-hidden"
          aria-labelledby="slide-over-heading"
        >
          <div
            className="w-screen max-w-lg overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <form className="h-full flex flex-col bg-white shadow-xl ">
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between w-full space-x-3">
                  <div className="w-full space-y-1">
                    <h2
                      id="slide-over-heading"
                      className="text-lg w-full font-medium text-gray-900"
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
              <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 relative overflow-hidden pl-6 flex-1">
                {body}
              </div>
              {footer}
            </form>
          </div>
        </Transition>
      </>
    );
  }
);
