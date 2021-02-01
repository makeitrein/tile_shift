import { throttle } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import { totalCanvasPixelSize } from "../board/board";
import { MiniMapArrows } from "./minimap-arrows";
import { MiniMapCards } from "./minimap-cards";

export const minimapId = "minimap";

export const minimapSizeDivider = 60;

export const MiniMap = React.memo(({ panzoom, canvasRef }) => {
  const [, triggerRerender] = useState(false);

  const minimapRef = useRef(null);
  const arrowIds = useRecoilValue(arrowState.arrowIds);

  const rerenderMinimapThrottled = useCallback(
    throttle(() => triggerRerender((val) => !val), 25),
    []
  );

  useEffect(() => {
    canvasRef?.current.addEventListener("panzoomchange", () => {
      console.log("hiya");
      rerenderMinimapThrottled();
    });
  }, [canvasRef]);

  if (!panzoom) return null;

  const mapDimensions = {
    width: totalCanvasPixelSize / (minimapSizeDivider - 2),
    height: totalCanvasPixelSize / (minimapSizeDivider - 2),
  };

  const { x, y, minX, maxX, minY, maxY, scale } = panzoom.getPan();

  const trueMinX = -maxX;
  const trueMaxX = -minX;

  const trueMinY = -maxY;
  const trueMaxY = -minY;

  const trueX = -x;
  const trueY = -y;

  const viewportWidth = window.innerWidth / scale / totalCanvasPixelSize;
  const viewportHeight = window.innerHeight / scale / totalCanvasPixelSize;

  const viewportWidthPercent = viewportWidth * 100;
  const viewportHeightPercent = viewportHeight * 100;

  const top =
    (trueY - trueMinY) / (trueMaxY - trueMinY + window.innerHeight / scale);
  const left =
    (trueX - trueMinX) / (trueMaxX - trueMinX + window.innerWidth / scale);

  const zoomToCard = (e: React.MouseEvent<HTMLElement>) => {
    if (!panzoom) return;
    const scale = panzoom.getScale();
    const xPercent =
      (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.clientWidth;
    const yPercent =
      (e.clientY - e.currentTarget.offsetTop) / e.currentTarget.clientHeight;

    const xDiff = trueMaxX - trueMinX;
    const yDiff = trueMaxY - trueMinY;

    const x = xDiff * xPercent + trueMinX;
    const y = yDiff * yPercent + trueMinY;

    panzoom.pan(-x, -y, { force: true });
  };

  const viewportDimensions = {
    top: top * 100 + "%",
    left: left * 100 + "%",
    width: viewportWidthPercent + "%",
    height: viewportHeightPercent + "%",
  };

  return (
    <div
      onClick={zoomToCard}
      ref={minimapRef}
      style={{ borderBottomLeftRadius: "0.375rem", ...mapDimensions }}
      id="minimap"
      className="fixed top-4  cursor-pointer right-4 bg-gray-500 rounded-r-md border-gray-400 border-2 z-overlay  bg-opacity-40	bg-gray-minimapSizeDivider0 border-gray-300 overflow-hidden"
    >
      <div style={viewportDimensions} className="absolute bg-blue-400" />
      <MiniMapCards />
      <MiniMapArrows />
    </div>
  );
});
