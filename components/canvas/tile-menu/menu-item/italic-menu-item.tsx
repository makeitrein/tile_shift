import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {
  toggle: () => void;
  active: boolean;
}

export const ItalicMenuItem = React.memo(({ toggle, active }: Props) => (
  <TooltipMenuItem label="Italic text" onClick={toggle} active={active}>
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="italic"
      className="w-4 h-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M798 160H366c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h181.2l-156 544H229c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8H474.4l156-544H798c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
    </svg>{" "}
  </TooltipMenuItem>
));
