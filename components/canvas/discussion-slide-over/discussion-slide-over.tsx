import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import { PanzoomObject } from "../board/panzoom/types";
import { Slideover } from "../general/slide-over";
import { DiscussionConversation } from "./discussion-conversation";
import { DiscussionForm } from "./discussion-form";
import { DiscussionSummary } from "./discussion-summary";
import { SelectDiscussion } from "./select-discussion";

interface Props {
  panzoom: PanzoomObject;
}

export const DiscussionDrawer = React.memo(({ panzoom }: Props) => {
  const [discussionDrawer, setDiscussionDrawer] = useRecoilState(
    tileState.discussionDrawer
  );

  const closeDrawer = useCallback(
    () => setDiscussionDrawer((state) => ({ ...state, open: false })),
    []
  );

  return (
    <Slideover
      closeDrawer={closeDrawer}
      isOpen={discussionDrawer.open}
      title={<SelectDiscussion panzoom={panzoom} />}
      body={<DiscussionConversation />}
      footer={<DiscussionForm />}
      description={<DiscussionSummary />}
    />
  );
});
