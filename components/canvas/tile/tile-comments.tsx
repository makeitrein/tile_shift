import { ChatAltOutline } from "heroicons-react";
import React from "react";
import { useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";

interface TileCommentsProps {
  id: string;
}

export const TileComments = React.memo(({ id }: TileCommentsProps) => {
  const setDiscussionDrawer = useSetRecoilState(tileState.discussionDrawer);

  const openTileDiscussion = React.useCallback(() => {
    setDiscussionDrawer((state) => ({ ...state, open: true, tileId: id }));
  }, [id]);

  return (
    <div
      onClick={openTileDiscussion}
      className="absolute top-3 right-3 cursor-pointer rounded-xl bg-gray-100 text-gray-800 p-2"
    >
      <ChatAltOutline />
    </div>
  );
});
