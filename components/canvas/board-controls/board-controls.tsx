import { HandOutline, SearchOutline } from "heroicons-react";
import React, { useState } from "react";
import { OmnibarSearch } from "./omnibar-search";
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

export const BoardControls = React.memo(({ panzoom }) => {
  const [searchOpen, setSearchOpen] = useState(false);

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

      <OmnibarSearch
        panzoom={panzoom}
        onClose={() => setSearchOpen(false)}
        isOpen={searchOpen}
      />
    </div>
  );
});
