import {
  ClockOutline,
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
    <div className="flex items-center justify-between mt-3 -mb-3 z-50 w-96 ">
      <span className="">
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

      {/* <span className="-mr-2">
        <ConsensusButtonShell
          color={"gray"}
          activeColor={"gray"}
          icon={<ClockOutline width={16} />}
          text={DateTime.fromISO(discussionDrawerTile.createdAt).toLocaleString(
            DateTime.DATETIME_MED
          )}
        />
      </span> */}

      <span className="flex items-center -mt-1">
        <ClockOutline size={16} className="mr-1" />
        {DateTime.fromISO(discussionDrawerTile.createdAt).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </span>
    </div>
  );
});
