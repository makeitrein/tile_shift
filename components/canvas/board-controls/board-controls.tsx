import { HandOutline, SearchOutline } from "heroicons-react";
import React, { useState } from "react";
import { OmnibarSearch } from "./omnibar-search";
const { htmlToText } = require("html-to-text");

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
        closeSearch={() => setSearchOpen(false)}
        isOpen={searchOpen}
      />
    </div>
  );
});
