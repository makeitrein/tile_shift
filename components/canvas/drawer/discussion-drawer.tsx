import React from "react";
import { useRecoilState } from "recoil";
import * as uiState from "../../state/ui";
import { Discussion } from "./discussion";
import { SelectTileDiscussion } from "./select-tile-discussion";
import { Slideover } from "./slide-over";

export const DiscussionDrawer = ({ panzoom }) => {
  const [discussionDrawer, setDiscussionDrawer] = useRecoilState(
    uiState.discussionDrawer
  );

  const closeDrawer = () =>
    setDiscussionDrawer((state) => ({ ...state, open: false }));
  return (
    <>
      <Slideover
        closeDrawer={closeDrawer}
        isOpen={discussionDrawer.open}
        title={<SelectTileDiscussion panzoom={panzoom} />}
      >
        <Discussion />
      </Slideover>
    </>
  );
};
