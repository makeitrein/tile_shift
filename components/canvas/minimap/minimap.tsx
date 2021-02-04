import { throttle } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { totalCanvasPixelSize } from "../board/board";
import { PanzoomObject } from "../board/panzoom/types";
import { MiniMapArrows } from "./minimap-arrows";
import { MiniMapTiles } from "./minimap-tiles";

export const minimapId = "minimap";

export const minimapSizeDivider = 60;

interface Props {
  panzoom: PanzoomObject;
  canvas: HTMLDivElement;
}

export const MiniMap = React.memo(({ panzoom, canvas }: Props) => {
  const [, triggerRerender] = useState(false);

  const minimapRef = useRef(null);

  const rerenderMinimapThrottled = useCallback(
    throttle(() => triggerRerender((val) => !val), 25),
    []
  );

  useEffect(() => {
    canvas?.addEventListener("panzoomchange", () => {
      rerenderMinimapThrottled();
    });
  }, [canvas]);

  if (!panzoom) return null;

  const mapSize = totalCanvasPixelSize / (minimapSizeDivider - 2);
  const mapDimensions = {
    width: mapSize,
    height: mapSize,
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

  const xDiff = trueMaxX - trueMinX;
  const yDiff = trueMaxY - trueMinY;

  const zoomToTile = (e: React.MouseEvent<HTMLElement>) => {
    if (!panzoom) return;
    const xPercent =
      (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.clientWidth;
    const yPercent =
      (e.clientY - e.currentTarget.offsetTop) / e.currentTarget.clientHeight;

    const x = xDiff * xPercent + trueMinX;
    const y = yDiff * yPercent + trueMinY;

    panzoom.pan(-x, -y, { force: true });
  };

  const width = (mapSize * viewportWidthPercent) / 100;
  const height = (mapSize * viewportHeightPercent) / 100;

  const translateX = (left * xDiff) / minimapSizeDivider + width / 2;
  const translateY = (top * yDiff) / minimapSizeDivider + height / 2;

  const viewportDimensions = {
    transition: ".1s transform",
    transform: `translate(${translateX}px,${translateY}px)`,
    width: width + "px",
    height: height + "px",
  };

  return (
    <div
      onClick={zoomToTile}
      ref={minimapRef}
      style={{ borderBottomLeftRadius: "0.375rem", ...mapDimensions }}
      id="minimap"
      className="panzoom-exclude fixed top-4 cursor-pointer right-4 bg-gray-500 rounded-r-md border-gray-400 border-2 z-overlay  bg-opacity-40	bg-gray-minimapSizeDivider0 border-gray-300 overflow-hidden"
    >
      <div style={viewportDimensions} className="absolute bg-blue-400" />
      <MiniMapTiles />
      <MiniMapArrows />
    </div>
  );
});
