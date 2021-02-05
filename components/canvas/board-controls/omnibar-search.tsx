import { Button, Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import { ChatAlt2Outline, ClockOutline } from "heroicons-react";
import { DateTime } from "luxon";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGetTileDimensions } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import { TileSearchResult } from "../../state/tiles";
import { Tag } from "../tile-menu/tag-picker";
const { htmlToText } = require("html-to-text");

export function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

export const selectedItem = (tile) => {
  if (!tile) {
    return (
      <Button
        className="w-96"
        alignText="left"
        rightIcon="double-caret-vertical"
        text={"Select Tile"}
      />
    );
  }

  const label = htmlToText(tile.content) || <i>No content</i>;
  return (
    <Button
      className="w-96"
      alignText="left"
      rightIcon="double-caret-vertical"
      text={
        <div className="flex items-center justify-between">
          <span className="truncate w-52">{label}</span>
          <Tag name={tile.tags[0]} />
        </div>
      }
      key={tile.id}
    />
  );
};

export const itemRenderer = (
  tile: TileSearchResult,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const label = htmlToText(tile.content) || <i>No content</i>;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      labelElement={
        <div className="flex">
          <Tag name={tile.tags[0]} />
        </div>
      }
      key={tile.id + label}
      /* ^^ Todo: figure out why this errors if we remove label */
      text={
        <div>
          <div className="truncate pr-2">{highlightText(label, query)}</div>
          <div
            className={`flex text-xs ${
              modifiers.active ? "text-white" : "text-gray-400"
            }`}
          >
            <ClockOutline size={16} className="mr-1" />
            {DateTime.fromISO(tile.createdAt).toLocaleString(
              DateTime.DATETIME_MED
            )}{" "}
            &middot;
            <ChatAlt2Outline className="mx-1" size={16} /> 33
          </div>
        </div>
      }
      onClick={handleClick}
    />
  );
};

export const panZoomToTile = (
  panzoom,
  { x, y, width }: tileState.TileDimensions
) => {
  panzoom.zoom(1);
  setTimeout(() => {
    panzoom.pan(
      -x + window.innerWidth / 2 - width / 2,
      -y + window.innerHeight / 2,
      { force: true }
    );
  });
};

export const filterTile = (query) => (tile) => {
  const normalizedTitle = tile.content.toLowerCase();
  const normalizedTag = (tile.tags[0] || "").toLowerCase();
  const normalizedQuery = query.toLowerCase();

  return `${normalizedTag} ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
};

export const itemListRenderer = ({
  items,
  itemsParentRef,
  query,
  renderItem,
}) => {
  return (
    <Menu ulRef={itemsParentRef}>
      {items.filter(filterTile(query)).map(renderItem)}
    </Menu>
  );
};

export const itemListPredicate = (query, tiles) =>
  tiles.filter(filterTile(query));

export const noResults = <Menu.Item disabled={true} text="No results" />;

interface Props {
  isOpen: boolean;
  closeSearch: () => void;
  panzoom: any;
}

const TileOmnibar = Omnibar.ofType<TileSearchResult>();

export const OmnibarSearch = React.memo(
  ({ isOpen, closeSearch, panzoom }: Props) => {
    const tileSearchResults = useRecoilValue(tileState.tileSearchResults);
    const setSearchedForTile = useSetRecoilState(tileState.searchedForTile);
    const getTileDimensions = useGetTileDimensions();

    return (
      <TileOmnibar
        isOpen={isOpen}
        items={tileSearchResults}
        onClose={closeSearch}
        itemListRenderer={itemListRenderer}
        onItemSelect={({ id }) => {
          setSearchedForTile(id);
          const dimensions = getTileDimensions(id);
          panZoomToTile(panzoom, dimensions);
          closeSearch();
        }}
        itemRenderer={itemRenderer}
        itemListPredicate={itemListPredicate}
        noResults={noResults}
        resetOnSelect
      />
    );
  }
);
