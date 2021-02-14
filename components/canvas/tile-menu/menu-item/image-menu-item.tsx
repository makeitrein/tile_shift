import { PhotographOutline } from "heroicons-react";
import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {}

export const ImageMenuItem = React.memo(({}: Props) => (
  <TooltipMenuItem
    label="Image Upload"
    className="pl-4"
    //  onClick={toggle} active={active}
  >
    <PhotographOutline className="w-4 h-4" />
  </TooltipMenuItem>
));
