import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";
import { totalCanvasPixelSize } from "../board/board";

const minimapSizeDivider = 60;
export const minimapId = "minimap";

export const MiniMap = React.memo(({ panzoom, canvas }) => {
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableCardId = useRecoilValue(cardState.editableCardId);

  const minimapRef = useRef(null);

  const [, setHack] = React.useState(false);

  useEffect(
    function hackStateUpdate() {
      setInterval(() => setHack((hack) => !hack), 100);
    },
    [panzoom]
  );

  // useEffect(() => {
  //   if (!minimapRef.current) return;

  //   new Gesto(minimapRef.current, {
  //     container: minimapRef.current,
  //     pinchOutside: false,
  //   }).on("drag", (e) => {
  //     console.log(e);
  //     // console.log(e);
  //     // console.log(e.clientX, e.clientY);
  //     const x =
  //       (e.clientX - e.inputEvent.target.offsetLeft) /
  //       e.inputEvent.target.clientWidth;
  //     const y =
  //       (e.clientY - e.inputEvent.target.offsetTop) /
  //       e.inputEvent.target.clientHeight;

  //     console.log(x, y);

  //     // panzoom.zoom();
  //   });
  // }, [minimapRef.current]);

  if (!panzoom) return null;

  console.log(canvas.clientWidth);

  const mapDimensions = {
    width: totalCanvasPixelSize / (minimapSizeDivider - 2),
    height: totalCanvasPixelSize / (minimapSizeDivider - 2),
  };

  const { x, y, minX, maxX, minY, maxY } = panzoom.getPan();

  const trueMinX = Math.abs(maxX);
  const trueMaxX = Math.abs(minX);

  const trueMinY = Math.abs(maxY);
  const trueMaxY = Math.abs(minY);

  const trueX = Math.abs(x);
  const trueY = Math.abs(y);

  const scale = panzoom.getScale();

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

    console.log(xPercent, yPercent, xDiff, yDiff, x, y);

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
      style={mapDimensions}
      id="minimap"
      className="fixed top-4 right-4 bg-gray-500 rounded-md border-gray-400 border-4 z-force  bg-opacity-40	bg-gray-minimapSizeDivider0 border-gray-300 overflow-hidden"
    >
      <div style={viewportDimensions} className="absolute bg-blue-400" />
      {cardIds.map((id) => (
        <MiniMapItem panzoom={panzoom} key={id} id={id} />
      ))}
    </div>
  );
});

const MiniMapCard = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  margin: 4px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color,
    0.2s outline;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  outline: 1px solid ${({ isDragging }) => (isDragging ? "red" : "transparent")} !important;
`;

interface Props {
  id: string;
  panzoom: any;
}

const MiniMapItem = ({ id, panzoom }: Props) => {
  const cardDimensions = useRecoilValue(cardState.cardDimensions(id));
  const cardSettings = useRecoilValue(cardState.cardSettings(id));
  const editableCardId = useRecoilValue(cardState.editableCardId);
  const colorTheme = useRecoilValue(cardState.cardColorTheme(id));

  const transformStyle = {
    transform: `translate(${cardDimensions.x / minimapSizeDivider}px, ${
      cardDimensions.y / minimapSizeDivider
    }px)`,
    transformOrigin: "-100% -100%",
  };

  return (
    <MiniMapCard
      // onClick={() => zoomToCard({ x: cardDimensions.x, y: cardDimensions.y })}
      id={id}
      isDragging={cardSettings.isDragging}
      style={{
        width: cardDimensions.width / minimapSizeDivider,
        height: cardDimensions.height / minimapSizeDivider,
        ...colorTheme,
        ...transformStyle,
      }}
    ></MiniMapCard>
  );
};
