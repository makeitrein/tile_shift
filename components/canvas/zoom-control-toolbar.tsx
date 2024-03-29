import React, { useCallback } from "react";
import { PanzoomObject } from "./board/panzoom/types";
import { Button } from "./general/button";

interface Props {
  panzoom: PanzoomObject;
}

export const ZoomControlToolbar = React.memo(({ panzoom }: Props) => {
  const zoom = useCallback(
    (scale: number) => {
      panzoom.zoomToPoint(panzoom.getScale() + scale, {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
    },
    [panzoom]
  );

  return (
    <div className="fixed top-4 right-44 pr-3 z-overlay">
      <Button className="rounded-tl-md" onClick={() => zoom(0.1)}>
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

      <Button className="rounded-bl-md -mt-1" onClick={() => zoom(-0.1)}>
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
    </div>
  );
});
