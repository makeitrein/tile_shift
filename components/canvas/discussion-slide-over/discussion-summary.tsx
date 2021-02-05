import {
  QuestionMarkCircleOutline,
  ThumbDownOutline,
  ThumbUpOutline,
} from "heroicons-react";
import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { ConsensusButtonShell } from "./discussion-form";

export const DiscussionSummary = React.memo(() => {
  const discussionDrawerTile = useRecoilValue(tileState.discussionDrawerTile);

  console.log(discussionDrawerTile.createdAt);

  return (
    <div className="flex items-center justify-between mt-3 left-20 ml-2 z-50 w-96 flex-nowrap absolute ">
      <span className="">
        <ConsensusButtonShell
          color={"green"}
          activeColor={"green"}
          icon={<ThumbUpOutline width={16} />}
          text="Agree"
          count={10}
        />

        <ConsensusButtonShell
          color={"orange"}
          activeColor={"orange"}
          icon={<QuestionMarkCircleOutline width={16} />}
          text="Question"
          count={5}
        />

        <ConsensusButtonShell
          color={"red"}
          activeColor={"red"}
          icon={<ThumbDownOutline width={16} />}
          text="Disagree"
          count={3}
        />
      </span>

      {/* <span className="pr-11 flex items-center">
        <ClockOutline size={16} className="mr-1" />
        {DateTime.fromISO(discussionDrawerTile.createdAt).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </span> */}
    </div>
  );
});
