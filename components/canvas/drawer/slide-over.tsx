import { Transition } from "@headlessui/react";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { hoveringOverScrollable } from "../../state/ui";
import { DiscussionForm } from "./discussion";

const Header = styled.div`
  // > span,
  // > span > span {
  //   display: block;
  //   width: 100%;
  // }
`;
export const Slideover = ({ isOpen, closeDrawer, title, children }) => {
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
        className="fixed z-force inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 overflow-hidden"
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
                  <Header
                    id="slide-over-heading"
                    className="text-lg w-full font-medium text-gray-900"
                  >
                    {title}
                  </Header>
                  <p className="text-sm text-gray-500">Description Here</p>
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
              {children}
            </div>
            <DiscussionForm />
          </form>
        </div>
      </Transition>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
