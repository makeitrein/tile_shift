import * as React from "react";
import { useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { Tooltip } from "../general/tooltip";
import { ColorBlock, ColorPicker } from "./color-picker";
import { CurrentStrokeWidth, StrokeWidthPicker } from "./stroke-width-picker";
import { TooltipMenuItem } from "./tooltip-menu-item";

export const ArrowMenu = ({ id }) => {
  const [strokeWidthPickerVisible, setStrokeWidthPickerVisible] = useState(
    false
  );

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const strokeWidthPickerVisibleRef = useOnClickOutside(() => {
    setStrokeWidthPickerVisible(false);
  });

  const emojiPickerTooltipRef = useOnClickOutside(() => {
    setEmojiPickerVisible(false);
  });

  const colorPickerTooltipRef = useOnClickOutside(() => {
    setColorPickerVisible(false);
  });

  return (
    <div
      style={{ transform: "translate(-50%, -50%)" }}
      className="absolute top-1/2 left-1/2 z-force cursor-pointer flex justify-center"
    >
      <TooltipMenuItem ref={strokeWidthPickerVisibleRef}>
        <Tooltip visible={strokeWidthPickerVisible}>
          <StrokeWidthPicker id={id} />
        </Tooltip>
        <span
          className="absolute inset-0 z-50"
          onClick={() => setStrokeWidthPickerVisible((visible) => !visible)}
        ></span>
        <CurrentStrokeWidth id={id} />
      </TooltipMenuItem>

      <TooltipMenuItem ref={colorPickerTooltipRef}>
        <Tooltip visible={colorPickerVisible}>
          <ColorPicker id={id} />
        </Tooltip>
        <span
          className="absolute inset-0 z-50"
          onClick={() => setColorPickerVisible((visible) => !visible)}
        ></span>
        <ColorBlock id={id} />
      </TooltipMenuItem>
    </div>
  );
};
