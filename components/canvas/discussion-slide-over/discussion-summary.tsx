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

const TileSelect = Select.ofType<tileState.TileSearchResult>();

export const SelectDiscussion = ({ panzoom }) => {
  const tileSearchResults = useRecoilValue(tileState.tileSearchResults);
  const [{ tileId }, setDiscussionDrawer] = useRecoilState(
    tileState.discussionDrawer
  );
  const setSearchedForTile = useSetRecoilState(tileState.searchedForTile);
  const getTileDimensions = useGetTileDimensions();

  const openTileDiscussion = React.useCallback((tileId) => {
    setDiscussionDrawer((state) => ({ ...state, open: true, tileId }));
  }, []);

  const findDiscussedTile = (id: string) =>
    tileSearchResults.find((tile) => tile.id === id);

  return (
    <TileSelect
      items={tileSearchResults}
      onItemSelect={({ id }) => {
        openTileDiscussion(id);
        setSearchedForTile(id);
        const dimensions = getTileDimensions(id);
        panZoomToTile(panzoom, dimensions);
      }}
      itemRenderer={itemRenderer}
      noResults={noResults}
      itemListPredicate={itemListPredicate}
      popoverProps={{ popoverClassName: "w-96" }}
    >
      {selectedItem(findDiscussedTile(tileId))}
    </TileSelect>
  );
};
