import React from "react";
import { Button } from "./general/button";

export const ZoomControlToolbar = ({
  panzoom,
  range,
  disablePan,
  toggleDisablePan,
}) => {
  return (
    <div className="fixed top-4 right-44 pr-3 z-overlay">
      {/* <Button
        onClick={toggleDisablePan}
        active={!disablePan}
        className={`rounded-md mr-3 shadow-sm transition`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 -ml-1 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
        Pan
      </Button> */}
      <Button
        className="rounded-tl-md"
        onClick={() => {
          panzoom.zoomToPoint(panzoom.getScale() + 0.1, {
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2,
          });
          if (range.current) range.current.value = panzoom.getScale() + "";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </Button>
      <br />

      <Button
        className="rounded-bl-md -mt-1"
        onClick={() => {
          panzoom.zoomToPoint(panzoom.getScale() - 0.1, {
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2,
          });
          if (range.current) range.current.value = panzoom.getScale() + "";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
          />
        </svg>
      </Button>
      {/* <select
          id="country"
          name="country"
          class="outline-transparent -ml-px border-t border-b border-gray-300 bg-white h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm"
        >
          <option>25</option>
          <option>50</option>
          <option>75</option>
        </select> */}
    </div>
  );
};
