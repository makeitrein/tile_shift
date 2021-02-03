import { Select } from "@blueprintjs/select";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as cardState from "../../state/cards";
import {
  itemListPredicate,
  itemRenderer,
  noResults,
  panZoomToCard,
  selectedItem,
} from "../board-controls/omnibar-search";

export const SelectCardDiscussion = ({ panzoom }) => {
  const allCardData = useRecoilValue(cardState.allCardData);
  const [discussionTileId, setDiscussionTileId] = useRecoilState(
    cardState.discussionTileId
  );
  const setSearchedForTile = useSetRecoilState(cardState.searchedForTile);

  const findDiscussedTile = (id) => allCardData.find((card) => card.id === id);

  return (
    <Select
      items={allCardData}
      onItemSelect={({ id }) => {
        setDiscussionTileId(id);
        setSearchedForTile(id);
        const selectedTile = findDiscussedTile(id);
        panZoomToCard(panzoom)(selectedTile);
      }}
      itemRenderer={itemRenderer}
      noResults={noResults}
      itemListPredicate={itemListPredicate}
      popoverProps={{ popoverClassName: "w-96" }}
    >
      {selectedItem(findDiscussedTile(discussionTileId))}
    </Select>
  );
};
