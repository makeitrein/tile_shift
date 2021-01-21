import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";

export const MiniMap = ({ panzoom, canvas }) => {
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableCardId = useRecoilValue(cardState.editableCardId);

  if (!panzoom) return null;

  const mapDimensions = {
    width: canvas.clientWidth / 100,
    height: canvas.clientHeight / 100,
  };

  const { x, y } = panzoom.getPan();

  const scale = panzoom.getScale();

  console.log("Current x is " + x);

  console.log(scale);

  // scale is 0.1
  console.log(
    "Works for fully zoomed out",
    (window.innerWidth * 9) / scale / 2
  );

  // scale is 1
  console.log(
    "Works for fully zoomed in ",
    (window.innerWidth * 9) / scale / 1
  );

  // scale is .4
  console.log("Works for middle zoomed in ", (window.innerWidth * 9) / scale);

  console.log("scale", scale);

  const totalCanvasPixelSize = 10000;

  const viewportWidth = window.innerWidth / scale / totalCanvasPixelSize;
  const viewportHeight = window.innerHeight / scale / totalCanvasPixelSize;

  const viewportWidthPercent = viewportWidth * 100;
  const viewportHeightPercent = viewportHeight * 100;

  const newX = x + (totalCanvasPixelSize / scale - totalCanvasPixelSize) / 2;

  const newY = y + (totalCanvasPixelSize / scale - totalCanvasPixelSize) / 2;

  const top = -(newY / totalCanvasPixelSize) / scale;
  const left = -(newX / totalCanvasPixelSize) / scale;

  const viewportDimensions = {
    top: top * 100 + "%",
    left: left * 100 + "%",
    width: viewportWidthPercent + "%",
    height: viewportHeightPercent + "%",
  };

  return (
    <div>
      <p className="fixed left-0 top-0">
        Window InnerWidth {window.innerHeight}
        <p>Scale {scale}</p>
        <p>Top {top}</p>
        <p>Left {left}</p>
        <p>x {x}</p>
        <p>y {y}</p>
      </p>

      <div
        style={mapDimensions}
        className="fixed top-5 rounded-md right-5 bg-opacity-40	bg-gray-500 border-gray-300 border overflow-hidden"
      >
        <div className="bg-blue-500 absolute" style={viewportDimensions}></div>
        {cardIds.map((id) => (
          <MiniMapItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

const MiniMapCard = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  margin: 4px;
  background: #fff;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  box-shadow: ${({ isDragging }) =>
    isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

interface Props {
  id: string;
}

const MiniMapItem = ({ id }: Props) => {
  const cardDimensions = useRecoilValue(cardState.cardDimensions(id));
  const cardSettings = useRecoilValue(cardState.cardSettings(id));
  const editableCardId = useRecoilValue(cardState.editableCardId);
  const colorTheme = useRecoilValue(cardState.cardColorTheme(id));

  const transformStyle = {
    transform: `translate(${cardDimensions.x / 105}px, ${
      cardDimensions.y / 105
    }px)`,
  };
  const isEditable = editableCardId === id;

  return (
    <MiniMapCard
      id={id}
      isDragging={cardSettings.isDragging}
      style={{
        width: cardDimensions.width / 20,
        height: cardDimensions.height / 20,
        ...colorTheme,
        ...transformStyle,
      }}
    ></MiniMapCard>
  );
};
