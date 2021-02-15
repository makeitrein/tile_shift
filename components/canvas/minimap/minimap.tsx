import { throttle } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { useAnimationFrame } from "../../general/hooks/useAnimationFrame";
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

const mapSizeAndDimensions = () => {
  const mapSize = totalCanvasPixelSize / (minimapSizeDivider - 2);
  const mapDimensions = {
    width: mapSize,
    height: mapSize,
  };

  return { mapSize, mapDimensions };
};

const calculateViewportDimensions = ({
  x,
  y,
  minX,
  maxX,
  minY,
  maxY,
  scale,
}) => {
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

  const { mapSize } = mapSizeAndDimensions();

  const width = (mapSize * viewportWidthPercent) / 100;
  const height = (mapSize * viewportHeightPercent) / 100;

  const translateX = (left * xDiff) / minimapSizeDivider + width / 2;
  const translateY = (top * yDiff) / minimapSizeDivider + height / 2;

  return {
    transition: ".1s transform",
    transform: `translate(${translateX}px,${translateY}px)`,
    width: width + "px",
    height: height + "px",
  };
};

export const MiniMap = React.memo(({ panzoom, canvas }: Props) => {
  const [, triggerRerender] = useState(false);

  const viewPortRef = useRef(null);

  const rerenderMinimapThrottled = useCallback(
    throttle(() => triggerRerender((val) => !val), 100),
    []
  );

  const { mapDimensions } = mapSizeAndDimensions();

  const zoomToTile = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { minX, maxX, minY, maxY } = panzoom.getPan();

      const trueMinX = -maxX;
      const trueMaxX = -minX;

      const trueMinY = -maxY;
      const trueMaxY = -minY;

      const xDiff = trueMaxX - trueMinX;
      const yDiff = trueMaxY - trueMinY;
      if (!panzoom) return;
      const xPercent =
        (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.clientWidth;
      const yPercent =
        (e.clientY - e.currentTarget.offsetTop) / e.currentTarget.clientHeight;

      const panX = xDiff * xPercent + trueMinX;
      const panY = yDiff * yPercent + trueMinY;

      panzoom.pan(-panX, -panY, { force: true });
    },
    [panzoom?.getPan()?.minX, panzoom?.getPan()?.minY]
  );

  const updateViewportStyle = useCallback(() => {
    if (viewPortRef.current && panzoom) {
      Object.assign(
        viewPortRef.current.style,
        calculateViewportDimensions(panzoom.getPan())
      );
    }
  }, [viewPortRef.current, panzoom]);

  useAnimationFrame(updateViewportStyle, 40);

  if (!panzoom) return null;

  return (
    <div
      onClick={zoomToTile}
      style={{ borderBottomLeftRadius: "0.375rem", ...mapDimensions }}
      id="minimap"
      className="panzoom-exclude fixed top-4 cursor-pointer right-4 bg-gray-500 rounded-r-md border-gray-400 border-2 z-overlay  bg-opacity-40	bg-gray-minimapSizeDivider0 border-gray-300 overflow-hidden"
    >
      <div ref={viewPortRef} className="absolute bg-blue-400" />
      <MiniMapTiles />
      <MiniMapArrows />
    </div>
  );
});
