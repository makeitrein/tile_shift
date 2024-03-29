import { PopoverInteractionKind } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";

interface Props {
  onClick?: () => void;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  rounded?: string;
  label?: string;
  popoverIsOpen?: boolean;
}

export const TooltipMenuItem = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    (
      {
        onClick,
        active,
        children,
        className,
        rounded = "",
        label,
        popoverIsOpen,
      },
      ref
    ) => {
      return (
        <Tooltip2
          popoverClassName="z-force"
          hoverOpenDelay={500}
          disabled={popoverIsOpen || !label}
          placement="top"
          interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
          content={<small className="text-sm whitespace-nowrap">{label}</small>}
        >
          <div
            ref={ref}
            className={`rounded-${rounded} shadow-sm bg-gray-500 relative h-9 -ml-px whitespace-nowrap
    `}
            onClick={onClick}
          >
            <span
              className={`rounded-${rounded} ${className} inline-flex h-full items-center
            justify-center w-full px-4 text-sm  text-gray-700 transition
             duration-150 ease-in-out bg-white border border-gray-300
              hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800
          ${active && "font-bold bg-gray-100 text-gray-1000"}
        `}
            >
              {children}
            </span>
          </div>
        </Tooltip2>
      );
    }
  )
);
