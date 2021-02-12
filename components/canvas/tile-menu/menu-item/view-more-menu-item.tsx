import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {}

export const ViewMoreMenuItem = React.memo(({}: Props) => (
  <TooltipMenuItem rounded="r-md">
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </TooltipMenuItem>
));
