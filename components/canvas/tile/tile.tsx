import { Button } from "@blueprintjs/core";
import { motion, useAnimation } from "framer-motion";
import parse from "html-react-parser";
import React, { useCallback, useMemo, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { tileHeight, tileWidth } from "../../state/tile-defaults";
import { useSetTileDimensions } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { EditableArticle } from "../text-editor/wysiwig-editor";
import { Tag } from "../tile-menu/tag";
import { TagPickerMulti } from "../tile-menu/tag-picker-multi";
import { ConnectButton } from "./connect-button";
import { AvatarComments } from "./tile-comments";
export const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: ${tileWidth}px;
  height: ${tileHeight}px;
  margin: 4px;
  border-radius: 0.5rem;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const CollapsedTileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: auto;
  margin: 4px;
  border-radius: 0.5rem;
  background: white;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

interface TileProps {
  id: string;
}

export const tileTitleElementId = (id: string) => id + "title";
export const tileDescriptionElementId = (id: string) => id + "description";

export const Tile = React.memo(({ id }: TileProps) => {
  const tileRef = useRef(null);
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const [selectedTileTargets, setSelectedTileTargets] = useRecoilState(
    tileState.selectedTileTargets
  );
  const disablePan = useRecoilValue(uiState.disablePan);

  const [tileSettings, setTileSettings] = useRecoilState(
    tileState.tileSettings(id)
  );
  const editableTileId = useRecoilValue(tileState.editableTileId);
  const tileContent = useRecoilValue(tileState.tileContent(id));
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);
  const searchedForTile = useRecoilValue(tileState.searchedForTile);
  const setTileDimensions = useSetTileDimensions();

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${tileDimensions.x}px, ${tileDimensions.y}px)`,
    }),
    [tileDimensions.x, tileDimensions.y]
  );

  const isSelected = selectedTileIds.includes(id);
  const isEditable = editableTileId === id;
  const isSearchedFor = searchedForTile === id;

  const { collapsed } = tileSettings;

  const disablePanzoomPanningClass = "panzoom-exclude";

  const selectTile = useCallback(() => {
    // || (disablePan && selectedTileTargets.length <= 1)
    if (!disablePan) {
      setSelectedTileTargets([tileRef.current]);
    }
  }, [disablePan, tileRef]);

  const frontTile = useAnimation();
  const backTile = useAnimation();

  const flip = () => {
    frontTile.start({ rotateY: -180 });
    backTile.start({ rotateY: 0 });
  };

  const flipBack = () => {
    frontTile.start({ rotateY: 0 });
    backTile.start({ rotateY: -180 });
  };

  return (
    <TileWrapper
      onMouseOver={selectTile}
      ref={tileRef}
      id={id}
      isDragging={tileSettings.isDragging}
      isSelected={isSelected}
      className={`${disablePanzoomPanningClass} canvas-tile group
      ${tileSettings.isDragging ? "cursor-grabbing" : "cursor-grab"}
      ${isSearchedFor && "animate-searched"}`}
      style={{
        width: tileDimensions.width,
        height: tileDimensions.height,
        ...transformStyle,
      }}
    >
      <motion.div
        style={{
          background: "#FFD675",
          height: "100%",
          width: "100%",
          padding: 30,
          position: "absolute",
          WebkitBackfaceVisibility: "hidden",
        }}
        initial={{ rotateY: 0 }}
        animate={frontTile}
        transition={{ duration: 1 }}
      >
        <Button
          icon="random"
          onClick={flip}
          className="absolute bottom-2 right-2"
        />
        <Tags onClick={flip} tags={tileSettings.tags} />
        <AvatarComments id={id} />
        <div id={`editor-${id}`} />

        {isEditable && (
          <>
            <ConnectButton id={id} direction="top" />
            <ConnectButton id={id} direction="right" />
            <ConnectButton id={id} direction="left" />
            <ConnectButton id={id} direction="bottom" />
          </>
        )}

        {!isEditable && (
          <EditableArticle>{parse(tileContent.content || "")}</EditableArticle>
        )}
      </motion.div>
      <motion.div
        style={{
          background: "#19D2A7",
          height: "100%",
          width: "100%",
          padding: 30,
          position: "absolute",
          WebkitBackfaceVisibility: "hidden",
        }}
        initial={{ rotateY: 180 }}
        animate={backTile}
        transition={{ duration: 1 }}
      >
        <TagPickerMulti id={id} />
        <Button
          icon="random"
          onClick={flipBack}
          className="absolute bottom-2 right-2"
        />
      </motion.div>
    </TileWrapper>
  );
});

interface Props {
  tags: string[];
  onClick: () => void;
}
export const Tags = React.memo(({ tags, onClick }: Props) => {
  const setTagPickerOpen = useSetRecoilState(uiState.tagPickerOpen);

  return (
    <div className="mt-0">
      {tags.map((tag) => (
        <Tag
          className="cursor-pointer mr-1"
          active={true}
          onClick={onClick}
          name={tag}
        ></Tag>
      ))}
    </div>
  );
});
