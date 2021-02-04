import { Select } from "@blueprintjs/select";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import {
  itemListPredicate,
  itemRenderer,
  noResults,
  panZoomToTile,
  selectedItem,
} from "../board-controls/omnibar-search";

export const SelectTileDiscussion = ({ panzoom }) => {
  const allTileData = useRecoilValue(tileState.allTileData);
  const [discussionTileId, setDiscussionTileId] = useRecoilState(
    tileState.discussionTileId
  );
  const setSearchedForTile = useSetRecoilState(tileState.searchedForTile);

  const findDiscussedTile = (id) => allTileData.find((tile) => tile.id === id);

  return (
    <Select
      items={allTileData}
      onItemSelect={({ id }) => {
        setDiscussionTileId(id);
        setSearchedForTile(id);
        const selectedTile = findDiscussedTile(id);
        panZoomToTile(panzoom)(selectedTile);
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
