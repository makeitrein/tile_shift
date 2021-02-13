import React from "react";
import { useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import * as uiState from "../../state/ui";
import { Tag } from "../tile-menu/tag";

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
  name: string;
  onClick: () => void;
}
const Tags = React.memo(({ name, onClick }: Props) => {
  const setTagPickerOpen = useSetRecoilState(uiState.tagPickerOpen);

  return (
    <div className="mt-2 ml-2">
      <Tag className="nw-resize" onClick={onClick} name={name}></Tag>
    </div>
  );
});
