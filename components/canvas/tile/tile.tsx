import { ArrowsExpandOutline } from "heroicons-react";
import parse from "html-react-parser";
import React, { useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useSetTileDimensions } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { EditableArticle } from "../text-editor/wysiwig-editor";
import { Tag } from "../tile-menu/tag-picker";
import { ConnectButton } from "./connect-button";

export const tileWidth = 350;
export const tileHeight = 190;

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
  box-shadow: ${({ isDragging }) =>
    isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
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
  box-shadow: ${({ isDragging }) =>
    isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
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

  const transformStyle = {
    transform: `translate(${tileDimensions.x}px, ${tileDimensions.y}px)`,
  };
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

  const toggleCollapse = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedTileTargets([]);

      if (collapsed) {
        setTileSettings((settings) => ({
          ...settings,
          collapsed: false,
        }));

        setTileDimensions(id, {
          width: tileDimensions.expandedWidth || tileWidth,
          height: tileDimensions.expandedHeight || tileHeight,
        });
      } else {
        setTileSettings((settings) => ({
          ...settings,
          collapsed: true,
        }));

        setTileDimensions(id, {
          expandedWidth: tileDimensions.width,
          expandedHeight: tileDimensions.height,
        });

        setTimeout(() => {
          const { width, height } = tileRef.current.getBoundingClientRect();
          setTileDimensions(id, { width, height });
        }, 10);
      }
    },
    [collapsed, tileDimensions]
  );

  return collapsed ? (
    <CollapsedTileWrapper
      onMouseOver={selectTile}
      ref={tileRef}
      id={id}
      style={transformStyle}
      className={`${disablePanzoomPanningClass} canvas-tile group p-4  ${
        tileSettings.isDragging ? "cursor-grabbing" : "cursor-grab"
      }
    ${isSearchedFor && "animate-searched"}`}
    >
      <Tag
        className="se-resize"
        onClick={toggleCollapse}
        name={tileSettings.tags[0]}
      >
        <ArrowsExpandOutline size={18} />
      </Tag>
    </CollapsedTileWrapper>
  ) : (
    <TileWrapper
      onMouseOver={selectTile}
      ref={tileRef}
      id={id}
      isDragging={tileSettings.isDragging}
      isSelected={isSelected}
      className={`${disablePanzoomPanningClass} canvas-tile group p-2 bg-white
      ${tileSettings.isDragging ? "cursor-grabbing" : "cursor-grab"}
      ${isSearchedFor && "animate-searched"}`}
      style={{
        width: tileDimensions.width,
        height: tileDimensions.height,
        ...transformStyle,
      }}
    >
      <Tags onClick={toggleCollapse} tags={tileSettings.tags} />
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
    </TileWrapper>
  );
});

interface AvatarCommentsProps {
  id: string;
}

export const AvatarComments = React.memo(({ id }: AvatarCommentsProps) => {
  const setDiscussionDrawer = useSetRecoilState(tileState.discussionDrawer);

  const openTileDiscussion = React.useCallback(() => {
    setDiscussionDrawer((state) => ({ ...state, open: true, tileId: id }));
  }, [id]);

  return (
    <div
      onClick={openTileDiscussion}
      className="cursor-pointer flex text-gray-400 absolute top-3 right-3 justify-evenly z-50"
    >
      <>
        <span className="flex items-center">
          <span className="inline-block relative mr-1">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-gray-300"></span>
          </span>

          <span className="inline-block relative mr-1">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-rose-300"></span>
          </span>
          <span className="inline-block relative mr-1">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-green-300"></span>
          </span>
          <span className="inline-block relative mr-1">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-green-300"></span>
          </span>

          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
            <span className="text-xs font-medium leading-none text-white">
              4+
            </span>
          </span>
        </span>
      </>
    </div>
  );
});

interface Props {
  tags: string[];
  onClick: () => void;
}
export const Tags = React.memo(({ tags, onClick }: Props) => {
  const setTagPickerOpen = useSetRecoilState(uiState.tagPickerOpen);

  return (
    <div className="mt-2 ml-2">
      <Tag className="nw-resize" onClick={onClick} name={tags[0]}></Tag>
    </div>
  );
});
