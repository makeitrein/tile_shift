import { Select } from "@blueprintjs/select";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useGetTileDimensions } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import {
  itemListPredicate,
  itemRenderer,
  noResults,
  panZoomToTile,
  selectedItem,
} from "../board-controls/omnibar-search";

const TileSelect = Select.ofType<tileState.TileSearchResults>();

export const SelectTileDiscussion = ({ panzoom }) => {
  const tileSearchResults = useRecoilValue(tileState.tileSearchResults);
  const [discussionTileId, setDiscussionTileId] = useRecoilState(
    tileState.discussionTileId
  );
  const setSearchedForTile = useSetRecoilState(tileState.searchedForTile);
  const getTileDimensions = useGetTileDimensions();

  const findDiscussedTile = (id) =>
    tileSearchResults.find((tile) => tile.id === id);

  return (
    <TileSelect
      items={tileSearchResults}
      onItemSelect={({ id }) => {
        setDiscussionTileId(id);
        setSearchedForTile(id);
        const dimensions = getTileDimensions(id);
        panZoomToTile(panzoom, dimensions);
      }}
      itemRenderer={itemRenderer}
      noResults={noResults}
      itemListPredicate={itemListPredicate}
      popoverProps={{ popoverClassName: "w-96" }}
    >
      {selectedItem(findDiscussedTile(discussionTileId))}
    </TileSelect>
  );
};
