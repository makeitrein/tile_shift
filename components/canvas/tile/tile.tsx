import React, { useCallback, useMemo, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { tileHeight, tileWidth } from "../../state/tile-defaults";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { TileInner } from "./tile-inner";

export const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  will-change: transform;

  width: ${tileWidth}px;
  height: ${tileHeight}px;
  margin: 4px;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
`;

interface TileProps {
  id: string;
}

export const Tile = React.memo(({ id }: TileProps) => {
  const tileRef = useRef(null);
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const setSelectedTileTargets = useSetRecoilState(
    tileState.selectedTileTargets
  );
  const disablePan = useRecoilValue(uiState.disablePan);

  const tileSettings = useRecoilValue(tileState.tileSettings(id));
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${tileDimensions.x}px, ${tileDimensions.y}px)`,
    }),
    [tileDimensions.x, tileDimensions.y]
  );

  const isSelected = selectedTileIds.includes(id);

  const disablePanzoomPanningClass = "panzoom-exclude";

  const selectTile = useCallback(() => {
    // || (disablePan && selectedTileTargets.length <= 1)
    if (!disablePan) {
      setSelectedTileTargets([tileRef.current]);
    }
  }, [disablePan, tileRef]);

  const tileWrapperStyle = useMemo(() => {
    return {
      width: tileDimensions.width,
      height: tileDimensions.height,
      ...transformStyle,
    };
  }, [tileDimensions.width, tileDimensions.height]);

  return (
    <TileWrapper
      onMouseOver={selectTile}
      ref={tileRef}
      id={id}
      isDragging={tileSettings.isDragging}
      isSelected={isSelected}
      className={`${disablePanzoomPanningClass} canvas-tile group rounded-xl
      ${tileSettings.isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={tileWrapperStyle}
    >
      <TileInner id={id} />
    </TileWrapper>
  );
});
