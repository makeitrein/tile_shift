import parse from "html-react-parser";
import React, { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { EditableArticle } from "../text-editor/wysiwig-editor";
import { Tag } from "../tile-menu/tag-picker";
import { ConnectButton } from "./connect-button";

export const tileWidth = 350;
export const tileHeight = 190;

const TileWrapper = styled.div`
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

interface TileProps {
  id: string;
}

export const tileTitleElementId = (id: string) => id + "title";
export const tileDescriptionElementId = (id: string) => id + "description";

export const Tile = React.memo(({ id }: TileProps) => {
  const ref = useRef();
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));
  const tileSettings = useRecoilValue(tileState.tileSettings(id));
  const editableTileId = useRecoilValue(tileState.editableTileId);
  const tileContent = useRecoilValue(tileState.tileContent(id));
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);
  const searchedForTile = useRecoilValue(tileState.searchedForTile);

  const transformStyle = {
    transform: `translate(${tileDimensions.x}px, ${tileDimensions.y}px)`,
  };
  const isSelected = selectedTileIds.includes(id);
  const isEditable = editableTileId === id;
  const isSearchedFor = searchedForTile === id;

  return (
    <TileWrapper
      ref={ref}
      id={id}
      isDragging={tileSettings.isDragging}
      isSelected={isSelected}
      className={`canvas-tile group p-2 bg-white ${
        isSearchedFor && "animate-searched "
      }`}
      style={{
        width: tileDimensions.width,
        height: tileDimensions.height,
        ...transformStyle,
      }}
    >
      <Tags tags={tileSettings.tags} />
      <AvatarComments />
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

export const AvatarComments = React.memo(() => {
  const setDiscussionDrawer = useSetRecoilState(uiState.discussionDrawer);

  return (
    <div
      onClick={() => setDiscussionDrawer((state) => ({ ...state, open: true }))}
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
}
export const Tags = React.memo(({ tags }: Props) => {
  const setTagPickerOpen = useSetRecoilState(uiState.tagPickerOpen);

  return (
    <div className="mt-2 ml-2">
      <Tag onClick={() => setTagPickerOpen(true)} name={tags[0]} />
    </div>
  );
});
