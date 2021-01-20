import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";

export const MiniMap = ({ panzoom }) => {
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableCardId = useRecoilValue(cardState.editableCardId);

  if (!panzoom) return null;

  const mapDimensions = {
    width: window.innerWidth / 10,
    height: window.innerHeight / 10,
  };

  const { x, y } = panzoom.getPan();
  const scale = panzoom.getScale();

  const canvasWidth = window.innerWidth * 10;
  const canvasHeight = window.innerHeight * 10;

  const viewportWidth = (window.innerWidth / canvasWidth / scale) * 100;
  const viewportHeight = (window.innerHeight / canvasHeight / scale) * 100;

  const top = Math.abs(y / viewportWidth) / 10 + "%";
  const left = Math.abs(x / viewportHeight) / 10 + "%";

  console.log("top", top);
  console.log("left", left);
  console.log("viewportWidth", viewportWidth);
  console.log("viewportHeight", viewportHeight);

  const viewportDimensions = {
    top,
    left,
    width: viewportWidth + "%",
    height: viewportHeight + "%",
  };

  return (
    <div
      style={mapDimensions}
      className="fixed top-5 rounded-md right-5 bg-gray-500 overflow-hidden"
    >
      <div className="bg-blue-500 absolute" style={viewportDimensions}></div>
      {cardIds.map((id) => (
        <MiniMapItem key={id} id={id} />
      ))}
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
  border-radius: 16px;
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
        width: cardDimensions.width / 30,
        height: cardDimensions.height / 30,
        ...colorTheme,
        ...transformStyle,
      }}
    ></MiniMapCard>
  );
};
