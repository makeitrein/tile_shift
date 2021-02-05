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
import { PanzoomObject } from "../board/panzoom/types";

const TileSelect = Select.ofType<tileState.TileSearchResult>();

interface Props {
  panzoom: PanzoomObject;
}

export const SelectDiscussion = React.memo(({ panzoom }: Props) => {
  const tileSearchResults = useRecoilValue(tileState.tileSearchResults);
  const [{ tileId }, setDiscussionDrawer] = useRecoilState(
    tileState.discussionDrawer
  );
  const discussionDrawerTile = useRecoilValue(tileState.discussionDrawerTile);

  const setSearchedForTile = useSetRecoilState(tileState.searchedForTile);
  const getTileDimensions = useGetTileDimensions();

  const openTileDiscussion = React.useCallback((tileId) => {
    setDiscussionDrawer((state) => ({ ...state, open: true, tileId }));
  }, []);

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
      {selectedItem(discussionDrawerTile)}
    </TileSelect>
  );
});
