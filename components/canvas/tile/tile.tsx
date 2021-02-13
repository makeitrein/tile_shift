import { motion, useAnimation } from "framer-motion";
import { ArrowNarrowLeft } from "heroicons-react";
import React, { CSSProperties, useCallback, useMemo, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { tileHeight, tileWidth } from "../../state/tile-defaults";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { Tag } from "../tile-menu/tag";
import { TagPickerMulti } from "../tile-menu/tag-picker-multi";
import { TileComments } from "./tile-comments";
import { TileConnectButtons } from "./tile-connect-buttons";
import { TileContent } from "./tile-content";
export const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
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

export const tileTitleElementId = (id: string) => id + "title";
export const tileDescriptionElementId = (id: string) => id + "description";

export const Tile = React.memo(({ id }: TileProps) => {
  const tileRef = useRef(null);
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const setSelectedTileTargets = useSetRecoilState(
    tileState.selectedTileTargets
  );
  const disablePan = useRecoilValue(uiState.disablePan);

  const [tileSettings, setTileSettings] = useRecoilState(
    tileState.tileSettings(id)
  );
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);
  const searchedForTile = useRecoilValue(tileState.searchedForTile);

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${tileDimensions.x}px, ${tileDimensions.y}px)`,
    }),
    [tileDimensions.x, tileDimensions.y]
  );

  const isSelected = selectedTileIds.includes(id);
  const isSearchedFor = searchedForTile === id;

  const colorTheme = useRecoilValue(tileState.tileColorTheme(id));

  const disablePanzoomPanningClass = "panzoom-exclude";

  const selectTile = useCallback(() => {
    // || (disablePan && selectedTileTargets.length <= 1)
    if (!disablePan) {
      setSelectedTileTargets([tileRef.current]);
    }
  }, [disablePan, tileRef]);

  const frontTile = useAnimation();
  const backTile = useAnimation();

  const flip = useCallback(() => {
    frontTile.start({ rotateY: -180 });
    backTile.start({ rotateY: 0 });
  }, []);

  const flipBack = useCallback(() => {
    frontTile.start({ rotateY: 0 });
    backTile.start({ rotateY: -180 });
  }, []);

  const flipStyle: CSSProperties = useMemo(() => {
    return {
      height: "100%",
      width: "100%",
      position: "absolute",
      WebkitBackfaceVisibility: "hidden",
      ...colorTheme,
    };
  }, [colorTheme]);

  const flipInitial = useMemo(() => {
    return {
      rotateY: 0,
    };
  }, []);

  const flipTransition = useMemo(() => {
    return {
      duration: 1,
    };
  }, []);

  const backFlipInitial = useMemo(() => {
    return {
      rotateY: 180,
    };
  }, []);

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
      ${tileSettings.isDragging ? "cursor-grabbing" : "cursor-grab"}
      ${isSearchedFor && "animate-searched"}`}
      style={tileWrapperStyle}
    >
      <motion.div
        style={flipStyle}
        className="p-5 rounded-xl"
        initial={flipInitial}
        animate={frontTile}
        transition={flipTransition}
      >
        <Tags onClick={flip} tags={tileSettings.tags} />
        <TileComments id={id} />
        <div id={`editor-${id}`} />

        <TileConnectButtons id={id} />
        <TileContent id={id} />
      </motion.div>
      <motion.div
        style={flipStyle}
        className="pt-20 p-6 rounded-xl"
        initial={backFlipInitial}
        animate={backTile}
        transition={flipTransition}
      >
        <TagPickerMulti id={id} />
        <div
          onClick={flipBack}
          className="absolute top-3 left-3 cursor-pointer rounded-xl bg-gray-100 text-gray-800 p-2"
        >
          <ArrowNarrowLeft />
        </div>
      </motion.div>
    </TileWrapper>
  );
});

interface Props {
  tags: string[];
  onClick: () => void;
}
export const Tags = React.memo(({ tags, onClick }: Props) => {
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
