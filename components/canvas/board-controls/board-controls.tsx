import { HandOutline, SearchOutline, TemplateOutline } from "heroicons-react";
import React, { useState } from "react";
import { PanzoomObject } from "../board/panzoom/types";
import { OmnibarSearch } from "./omnibar-search";

interface Props {
  panzoom: PanzoomObject;
  disablePan: boolean;
  toggleDisablePan: () => void;
}

export const BoardControls = React.memo(
  ({ panzoom, toggleDisablePan, disablePan }: Props) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const primaryColor = disablePan ? "gray" : "blue";
    const bgColor = disablePan ? "white" : "blue-100";

    return (
      <div className="fixed z-force top-1/2 left-6 flex flex-col z-0 shadow-sm rounded-md">
        <button
          onClick={toggleDisablePan}
          type="button"
          className={`relative inline-flex items-center px-3 py-2 rounded-t-md border border-${primaryColor}-300 bg-${bgColor} text-sm font-medium text-${primaryColor}-600 hover:bg-${bgColor}-300 focus:z-10 focus:outline-none`}
        >
          <HandOutline />
        </button>

        <button
          onClick={toggleDisablePan}
          type="button"
          className={`relative inline-flex items-center px-3 py-2 -mt-px border border-${primaryColor}-300 bg-${bgColor} text-sm font-medium text-${primaryColor}-600 hover:bg-${bgColor}-300 focus:z-10 focus:outline-none`}
        >
          <TemplateOutline />
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          type="button"
          className="-mt-px relative inline-flex items-center px-3 py-2 rounded-b-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
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
  }
);
