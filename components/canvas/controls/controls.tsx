import { Classes, Popover2 } from "@blueprintjs/popover2";
import { HandOutline, SearchOutline } from "heroicons-react";
import React from "react";
import { RecordSpeech } from "../record-speech/record-speech";

export const Controls = () => {
  return (
    <div className="fixed z-force top-1/2 left-6 flex flex-col z-0 shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-3 py-2 rounded-t-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <HandOutline />
      </button>

      <Popover2
        interactionKind="click"
        popoverClassName={Classes.POPOVER2_CONTENT}
        usePortal={false}
        placement="right"
        className="z-force"
        fill={true}
        content={<RecordSpeech />}
        renderTarget={({ isOpen, ref, ...targetProps }) => (
          <button
            ref={ref}
            {...targetProps}
            type="button"
            className="-mt-px relative inline-flex items-center px-3 py-2 rounded-b-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <SearchOutline />
          </button>
        )}
      />
    </div>
  );
};
