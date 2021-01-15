import React from "react";
import { Button, ButtonGroup } from "./general/button";

export const ZoomControlToolbar = ({
  panzoom,
  range,
  disablePan,
  toggleDisablePan,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-1000 flex">
      <Button
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
        Pan Mode
      </Button>
      <ButtonGroup>
        <Button className="rounded-l-md">
          <input
            ref={range}
            onChange={(event) => {
              panzoom.zoomToPoint(
                (event.target as HTMLInputElement).valueAsNumber,
                {
                  clientX: window.innerWidth / 2,
                  clientY: window.innerHeight / 2,
                }
              );
            }}
            className="range-input"
            type="range"
            min="0.3"
            max="3"
            step="0.3"
            defaultValue="1"
          />
        </Button>
        <Button
          className="-ml-px"
          onClick={() => {
            panzoom.zoomToPoint(panzoom.getScale() - 0.3, {
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
        <Button
          className="-ml-px rounded-r-md"
          onClick={() => {
            panzoom.zoomToPoint(panzoom.getScale() + 0.3, {
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
      </ButtonGroup>
    </div>
  );
};
