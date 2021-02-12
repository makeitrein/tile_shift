import { Classes, Popover2 } from "@blueprintjs/popover2";
import { HandOutline, SearchOutline, TemplateOutline } from "heroicons-react";
import React, { useState } from "react";
import { PanzoomObject } from "../board/panzoom/types";
import { OmnibarSearch } from "./omnibar-search";
import { TemplateLibrary } from "./template-library";

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
      <div className="fixed z-force top-1/2 -translate-y-2/4 transform left-6 flex flex-col z-0 shadow-sm rounded-md">
        <button
          onClick={toggleDisablePan}
          type="button"
          className={`relative inline-flex rounded-t-md items-center px-3 py-2 -mt-px  border border-${primaryColor}-300 bg-${bgColor} text-sm font-medium text-${primaryColor}-600 hover:bg-${bgColor}-300 focus:z-10 focus:outline-none`}
        >
          <HandOutline />
        </button>

        <Popover2
          interactionKind="click"
          popoverClassName={Classes.POPOVER2_CONTENT}
          placement="left"
          className="z-force"
          fill={true}
          content={<TemplateLibrary />}
          renderTarget={({ isOpen, ref, ...targetProps }) => (
            <button
              ref={ref}
              {...targetProps}
              type="button"
              className="-mt-px relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            >
              <TemplateOutline />
            </button>
          )}
        />

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
