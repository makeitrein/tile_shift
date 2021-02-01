import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";
import { minimapSizeDivider } from "./minimap";

export const MiniMapCards = React.memo(() => {
  const cardIds = useRecoilValue(cardState.cardIds);
  return (
    <>
      {cardIds.map((id) => (
        <MiniMapCard key={id} id={id} />
      ))}
    </>
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
