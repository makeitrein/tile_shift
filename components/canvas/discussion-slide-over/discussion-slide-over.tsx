import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import { Slideover } from "../general/slide-over";
import { DiscussionConversation } from "./discussion-conversation";
import { DiscussionForm } from "./discussion-form";
import { SelectDiscussion } from "./select-discussion";

export const DiscussionDrawer = ({ panzoom }) => {
  const [discussionDrawer, setDiscussionDrawer] = useRecoilState(
    tileState.discussionDrawer
  );

  const closeDrawer = useCallback(
    () => setDiscussionDrawer((state) => ({ ...state, open: false })),
    []
  );

  return (
    <>
      <Slideover
        closeDrawer={closeDrawer}
        isOpen={discussionDrawer.open}
        title={<SelectDiscussion panzoom={panzoom} />}
        body={<DiscussionConversation />}
        footer={<DiscussionForm />}
      />
    </>
  );
};
