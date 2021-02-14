import { ClipboardCheckOutline } from "heroicons-react";
import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {
  toggle: () => void;
  active: boolean;
}

export const CheckboxListMenuItem = React.memo(({ toggle, active }: Props) => (
  <TooltipMenuItem label="Checkbox List" onClick={toggle} active={active}>
    <ClipboardCheckOutline className="w-4 h-4" />
  </TooltipMenuItem>
));
