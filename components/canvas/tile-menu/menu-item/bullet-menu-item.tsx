import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {
  toggle: () => void;
  active: boolean;
}

export const BulletListMenuItem = React.memo(({ toggle, active }: Props) => (
  <TooltipMenuItem label="Bullet list" onClick={toggle} active={active}>
    <svg
      className="w-4 h-4"
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="unordered-list"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
    </svg>{" "}
  </TooltipMenuItem>
));
