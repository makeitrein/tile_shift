import { Tooltip2 } from "@blueprintjs/popover2";
import { Badge } from "antd";
import parse from "html-react-parser";
import React, { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import * as cardState from "../../state/cards";
import * as uiState from "../../state/ui";
import { Tag, TagPicker } from "../card-menu/tag-picker";
import { EditableArticle } from "../text-editor/wysiwig-editor";
import { ConnectButton } from "./connect-button";

// export const cardWidth = 140;
// export const cardHeight = 76;

export const cardWidth = 350;
export const cardHeight = 190;

const CardWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  margin: 4px;
  background: #fff;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;
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

export const cardTitleElementId = (id: string) => id + "title";
export const cardDescriptionElementId = (id: string) => id + "description";

export const Card = React.memo(({ id }: Props) => {
  const ref = useRef();
  const cardDimensions = useRecoilValue(cardState.cardDimensions(id));
  const cardSettings = useRecoilValue(cardState.cardSettings(id));
  const editableCardId = useRecoilValue(cardState.editableCardId);
  const cardContent = useRecoilValue(cardState.cardContent(id));
  const selectedCardIds = useRecoilValue(cardState.selectedCardIds);
  const colorTheme = useRecoilValue(cardState.cardColorTheme(id));

  const transformStyle = {
    transform: `translate(${cardDimensions.x}px, ${cardDimensions.y}px)`,
  };
  const isSelected = selectedCardIds.includes(id);
  const isEditable = editableCardId === id;

  const innerCard = cardSettings?.tags?.length ? (
    <>
      <div id={id + "editor"} />
      {!isEditable && (
        <EditableArticle>{parse(cardContent.content || "")}</EditableArticle>
      )}
      {isEditable && (
        <>
          <ConnectButton id={id} direction="top" />
          <ConnectButton id={id} direction="right" />
          <ConnectButton id={id} direction="left" />
          <ConnectButton id={id} direction="bottom" />
        </>
      )}
      {/* <Avatars /> */}
    </>
  ) : (
    <TagPicker id={id} />
  );

  return (
    <CardWrapper
      ref={ref}
      id={id}
      isDragging={cardSettings.isDragging}
      isSelected={isSelected}
      className="canvas-card group p-2"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        ...colorTheme,
        ...transformStyle,
      }}
    >
      <Tags tags={cardSettings.tags} />
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
        <EditableArticle>{parse(cardContent.content || "")}</EditableArticle>
      )}
    </CardWrapper>
  );
});

export const AvatarComments = () => {
  const setDiscussionDrawer = useSetRecoilState(uiState.discussionDrawer);

  return (
    <div
      onClick={() => setDiscussionDrawer((state) => ({ ...state, open: true }))}
      className="cursor-pointer flex text-gray-400 absolute top-3 right-3 justify-evenly z-50"
    >
      <Tooltip2
        usePortal={false}
        placement="right"
        content={
          <small className="text-sm whitespace-nowrap">
            Click to Read Comments
          </small>
        }
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
      </Tooltip2>
    </div>
  );
};

export const Tags = ({ tags }) => {
  return (
    <div className="mt-2 ml-2">
      <Tag name={tags[0]} />
    </div>
  );
};

export const TagIcon = () => {
  return (
    <div className="absolute top-2 left-2">
      <span className="rounded-md inline-flex p-2 bg-blue-50 text-blue-700 ring-4 ring-white">
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </div>
  );
};

export const CommentBadge = () => {
  return (
    <div className="absolute bottom-2 left-2">
      <Badge count={5}>
        <span className="rounded-lg inline-flex p-3 bg-gray-50 text-gray-700 ring-4 ring-white">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </span>
      </Badge>
    </div>
  );
};

export const Avatars = () => {
  return (
    <div className="flex -space-x-1 overflow-hidden absolute top-2 right-2">
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  );
};
