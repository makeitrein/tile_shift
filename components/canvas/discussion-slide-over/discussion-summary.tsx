import {
  QuestionMarkCircleOutline,
  ThumbDownOutline,
  ThumbUpOutline,
} from "heroicons-react";
import { DateTime } from "luxon";
import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { ConsensusButtonShell } from "./discussion-form";

export const DiscussionSummary = React.memo(() => {
  const discussionDrawerTile = useRecoilValue(tileState.discussionDrawerTile);

  console.log(discussionDrawerTile.createdAt);

  return (
    <div className="flex items-center justify-between">
      <span>
        <ConsensusButtonShell
          color={"green"}
          activeColor={"green"}
          icon={<ThumbUpOutline width={16} />}
          text="10"
        />

        <ConsensusButtonShell
          color={"orange"}
          activeColor={"orange"}
          icon={<QuestionMarkCircleOutline width={16} />}
          text="5"
        />

        <ConsensusButtonShell
          color={"red"}
          activeColor={"red"}
          icon={<ThumbDownOutline width={16} />}
          text="3"
        />
      </span>
      <span className="pr-2">
        {DateTime.fromISO(discussionDrawerTile.createdAt).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </span>
    </div>
  );
});
