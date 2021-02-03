import { Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import { HandOutline, SearchOutline } from "heroicons-react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import * as cardState from "../../state/cards";
import { Tag } from "../card-menu/tag-picker";
const { htmlToText } = require("html-to-text");

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function highlightText(text: string, query: string) {
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

export const Controls = React.memo(({ panzoom }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const allCardData = useRecoilValue(cardState.allCardData);

  const itemRenderer = (card, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = `${card.content}`;
    const label = htmlToText(card.content || "");
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        labelElement={
          <div className="flex">
            <Tag name={card.tags[0]} />
          </div>
        }
        text={highlightText(label, query)}
        key={card.id}
        onClick={handleClick}
      />
    );
  };

  const filterCard = (query) => (card) => {
    const normalizedTitle = card.content.toLowerCase();
    const normalizedTag = (card.tags[0] || "").toLowerCase();
    const normalizedQuery = query.toLowerCase();

    return `${normalizedTag} ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  };

  const panZoomToCard = (card) => {
    const padding = 40;
    panzoom.zoom(1);
    setTimeout(() => {
      panzoom.pan(
        -card.x + window.innerWidth / 2 - card.width / 2,
        -card.y + window.innerHeight / 2,
        { force: true }
      );
    });
  };

  return (
    <div className="fixed z-force top-1/2 left-6 flex flex-col z-0 shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-3 py-2 rounded-t-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <HandOutline />
      </button>

      <button
        onClick={() => setSearchOpen(true)}
        type="button"
        className="-mt-px relative inline-flex items-center px-3 py-2 rounded-b-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <SearchOutline />
      </button>

      <Omnibar
        query=""
        isOpen={searchOpen}
        items={allCardData}
        onClose={() => setSearchOpen(false)}
        itemListRenderer={({ items, itemsParentRef, query, renderItem }) => {
          return (
            <Menu ulRef={itemsParentRef}>
              {items.filter(filterCard(query)).map(renderItem)}
            </Menu>
          );
        }}
        onItemSelect={panZoomToCard}
        itemRenderer={itemRenderer}
        itemListPredicate={(query, items) => items.filter(filterCard(query))}
        noResults={<Menu.Item disabled={true} text="No results" />}
        resetOnSelect
      />
    </div>
  );
});
