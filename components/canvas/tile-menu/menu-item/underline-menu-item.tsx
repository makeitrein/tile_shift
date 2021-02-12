import { Icon } from "@blueprintjs/core";
import React from "react";
import { TooltipMenuItem } from "../tooltip-menu-item";

interface Props {
  toggle: () => void;
  active: boolean;
}

export const UnderlineMenuItem = React.memo(({ toggle, active }: Props) => (
  <TooltipMenuItem label="Underline text" onClick={toggle} active={active}>
    <Icon icon="underline" />
  </TooltipMenuItem>
));
