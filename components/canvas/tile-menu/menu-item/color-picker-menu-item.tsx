import { Classes, Popover2 } from "@blueprintjs/popover2";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { TagOutline } from "heroicons-react";
import * as React from "react";
import { ColorPicker } from "../color-picker";
import { TooltipMenuItem } from "../tooltip-menu-item";

export const ColorPickerMenuItem = React.memo(
  ({
    popoverOpen,
    setPopoverOpenCallback,
    id,
  }: {
    popoverOpen: boolean;
    setPopoverOpenCallback: (open: boolean) => void;
    id: string;
  }) => {
    return (
      <Popover2
        isOpen={popoverOpen}
        onInteraction={setPopoverOpenCallback}
        interactionKind="click"
        popoverClassName={Classes.POPOVER2_CONTENT}
        placement="left"
        className="z-force"
        fill={true}
        content={
          <div>
            <ColorPicker
              closePanel={() => setPopoverOpenCallback(false)}
              id={id}
            />
          </div>
        }
        renderTarget={({ isOpen, ref, ...targetProps }) => (
          <TooltipMenuItem
            popoverIsOpen={isOpen}
            label="Categories"
            ref={ref}
            {...targetProps}
            rounded="l-md"
          >
            <TagOutline className="w-4 h-4 mt-2 relative top-px" />
          </TooltipMenuItem>
        )}
      />
    );
  }
);
