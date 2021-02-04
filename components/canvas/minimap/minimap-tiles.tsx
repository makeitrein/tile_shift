import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as tileState from "../../state/tiles";
import { minimapSizeDivider } from "./minimap";

export const MiniMapTiles = React.memo(() => {
  const tileIds = useRecoilValue(tileState.tileIds);
  return (
    <>
      {tileIds.map((id) => (
        <MiniMapTile key={id} id={id} />
      ))}
    </>
  );
});

const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  margin: 4px;
  border-style: solid;
  border-radius: 2px;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color,
    0.2s outline;
  background: white;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  outline: 1px solid ${({ isDragging }) => (isDragging ? "red" : "transparent")} !important;
`;

interface Props {
  id: string;
}

const MiniMapTile = ({ id }: Props) => {
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const tileSettings = useRecoilValue(tileState.tileSettings(id));

  const transformStyle = {
    transform: `translate(${tileDimensions.x / minimapSizeDivider}px, ${
      tileDimensions.y / minimapSizeDivider
    }px)`,
    transformOrigin: "-100% -100%",
  };

  return (
    <TileWrapper
      id={id}
      isDragging={tileSettings.isDragging}
      style={{
        width: tileDimensions.width / minimapSizeDivider,
        height: tileDimensions.height / minimapSizeDivider,
        ...transformStyle,
      }}
    />
  );
};
