import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { arrowLeft, arrowRight } from "../arrow/arrow";
import { totalCanvasPixelSize } from "../board/board";
import { LineOrientation } from "../react-simple-arrows";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";

const minimapSizeDivider = 60;
export const minimapId = "minimap";

export const MiniMap = React.memo(({ panzoom }) => {
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);

  const [, rerender] = useState(false);

  const minimapRef = useRef(null);
  const arrowIds = useRecoilValue(arrowState.arrowIds);

  const rerenderer = useDebouncedCallback(() => {
    console.log("rerenderer");
    rerender((val) => !val);
  }, 100);

  useEffect(() => {
    window.addEventListener("mousewheel", rerenderer.callback, {
      passive: false,
    });

    window.addEventListener("mousewheel", () => rerender((val) => !val), {
      passive: false,
    });
  }, [rerenderer]);

  if (!panzoom) return null;

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
      style={{ borderBottomLeftRadius: "0.375rem", ...mapDimensions }}
      id="minimap"
      className="fixed top-4 right-4 bg-gray-500 rounded-r-md border-gray-400 border-2 z-overlay  bg-opacity-40	bg-gray-minimapSizeDivider0 border-gray-300 overflow-hidden"
    >
      <div style={viewportDimensions} className="absolute bg-blue-400" />
      {cardIds.map((id) => (
        <MiniMapCard panzoom={panzoom} key={id} id={id} />
      ))}
      {arrowIds.map((id) => (
        <MiniMapArrow id={id} />
      ))}
    </div>
  );
});

const CardWrapper = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  margin: 4px;
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
}

const MiniMapCard = ({ id }: Props) => {
  const cardDimensions = useRecoilValue(cardState.cardDimensions(id));
  const cardSettings = useRecoilValue(cardState.cardSettings(id));
  const colorTheme = useRecoilValue(cardState.cardColorTheme(id));

  const transformStyle = {
    transform: `translate(${cardDimensions.x / minimapSizeDivider}px, ${
      cardDimensions.y / minimapSizeDivider
    }px)`,
    transformOrigin: "-100% -100%",
  };

  return (
    <CardWrapper
      // onClick={() => zoomToCard({ x: cardDimensions.x, y: cardDimensions.y })}
      id={id}
      isDragging={cardSettings.isDragging}
      style={{
        width: cardDimensions.width / minimapSizeDivider,
        height: cardDimensions.height / minimapSizeDivider,
        ...colorTheme,
        ...transformStyle,
      }}
    />
  );
};

export const MiniMapArrow = React.memo(({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));
  const { color } = useRecoilValue(arrowState.arrowColorTheme(id));

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  const minimapStart = {
    x: startCard.x / (minimapSizeDivider - 3),
    y: startCard.y / (minimapSizeDivider - 3),
    width: startCard.width / minimapSizeDivider,
    height: startCard.height / minimapSizeDivider,
  };

  const minimapEnd = {
    x: endCard.x / (minimapSizeDivider - 3),
    y: endCard.y / (minimapSizeDivider - 3),
    width: endCard.width / minimapSizeDivider,
    height: endCard.height / minimapSizeDivider,
  };
  return (
    <BasicArrowSvg
      start={arrowRight(minimapStart)}
      end={arrowLeft(minimapEnd)}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth={"1"}
      color={color}
    />
  );
});
