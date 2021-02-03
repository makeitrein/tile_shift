import { Select } from "@blueprintjs/select";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as cardState from "../../state/cards";
import {
  itemListPredicate,
  itemRenderer,
  noResults,
  selectedItem,
} from "../board-controls/omnibar-search";

export const SelectCardDiscussion = () => {
  const allCardData = useRecoilValue(cardState.allCardData);
  const [discussionTileId, setDiscussionTileId] = useRecoilState(
    cardState.discussionTileId
  );

  const discussedTile = allCardData.find(
    (card) => card.id === discussionTileId
  );

  return (
    <Select
      items={allCardData}
      onItemSelect={({ id }) => setDiscussionTileId(id)}
      itemRenderer={itemRenderer}
      noResults={noResults}
      itemListPredicate={itemListPredicate}
      popoverProps={{ popoverClassName: "w-96" }}
    >
      {selectedItem(discussedTile)}
    </Select>
  );
};
