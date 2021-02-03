import { Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import { ChatAlt2Outline, ClockOutline } from "heroicons-react";
import React from "react";
import { useRecoilValue } from "recoil";
import * as cardState from "../../state/cards";
import { Tag } from "../card-menu/tag-picker";
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

export const itemRenderer = (card, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const label = htmlToText(card.content) || <i>No content</i>;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      labelElement={
        <div className="flex">
          <Tag name={card.tags[0]} />
        </div>
      }
      text={
        <div>
          <div className="truncate">{highlightText(label, query)}</div>
          <div className="flex text-xs text-gray-400">
            <ClockOutline className="mr-1" size={16} /> 30 minutes ago | 33{" "}
            <ChatAlt2Outline className="mx-1" size={16} />
          </div>
        </div>
      }
      key={card.id}
      onClick={handleClick}
    />
  );
};

export const panZoomToCard = (panzoom) => (card) => {
  panzoom.zoom(1);
  setTimeout(() => {
    panzoom.pan(
      -card.x + window.innerWidth / 2 - card.width / 2,
      -card.y + window.innerHeight / 2,
      { force: true }
    );
  });
};

export const filterCard = (query) => (card) => {
  const normalizedTitle = card.content.toLowerCase();
  const normalizedTag = (card.tags[0] || "").toLowerCase();
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
      {items.filter(filterCard(query)).map(renderItem)}
    </Menu>
  );
};

export const itemListPredicate = (query, cards) =>
  cards.filter(filterCard(query));

export const noResults = <Menu.Item disabled={true} text="No results" />;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  panzoom: any;
}

export const OmnibarSearch = React.memo(
  ({ isOpen, onClose, panzoom }: Props) => {
    const allCardData = useRecoilValue(cardState.allCardData);

    return (
      <Omnibar
        query=""
        isOpen={isOpen}
        items={allCardData}
        onClose={onClose}
        itemListRenderer={itemListRenderer}
        onItemSelect={panZoomToCard(panzoom)}
        itemRenderer={itemRenderer}
        itemListPredicate={itemListPredicate}
        noResults={noResults}
        resetOnSelect
      />
    );
  }
);
