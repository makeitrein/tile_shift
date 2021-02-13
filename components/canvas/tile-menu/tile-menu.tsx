import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { useRecoilState } from "recoil";
import { useRemirror } from "remirror/react";
import { tagPickerOpen } from "../../state/ui";
import { BoldMenuItem } from "./menu-item/bold-menu-item";
import { BulletListMenuItem } from "./menu-item/bullet-menu-item";
import { CodeMenuItem } from "./menu-item/code-menu-item";
import { HeaderMenuItem } from "./menu-item/header-menu-item";
import { ImageMenuItem } from "./menu-item/image-menu-item";
import { ItalicMenuItem } from "./menu-item/italic-menu-item";
import { OrderedListMenuItem } from "./menu-item/orderered-list-menu-item";
import { UnderlineMenuItem } from "./menu-item/underline-menu-item";
import { ViewMoreMenuItem } from "./menu-item/view-more-menu-item";

const variants = {
  enter: {
    x: 100,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    x: -100,
    opacity: 0,
  },
};

export const TileMenu = React.memo(({ id }: { id: string }) => {
  const { commands, active } = useRemirror({ autoUpdate: true });
  const [altToolbar, setAltToolbar] = useState(false);
  const [popoverOpen, setPopoverOpen] = useRecoilState(tagPickerOpen);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const tooltipRef = useRef(null);

  const [initialAnimation, setInitialAnimation] = useState(false);

  const colorPickerTooltipRef = useOnClickOutside(() => {
    setColorPickerVisible(false);
  });

  const toggleAltToolbar = () => {
    setInitialAnimation(true);
    setAltToolbar((active) => !active);
  };

  useEffect(() => {
    return () => setPopoverOpen(false);
  }, []);

  const setPopoverOpenCallback = React.useCallback(
    (state) => setPopoverOpen(state),
    []
  );

  const toggleBold = React.useCallback(() => commands.toggleBold(), []);
  const toggleUnderline = React.useCallback(
    () => commands.toggleUnderline(),
    []
  );
  const toggleItalic = React.useCallback(() => commands.toggleBold(), []);
  const toggleCode = React.useCallback(() => commands.toggleCode(), []);
  const toggleStrike = React.useCallback(() => commands.toggleStrike(), []);
  const toggleBulletList = React.useCallback(
    () => commands.toggleBulletList(),
    []
  );
  const toggleOrderedList = React.useCallback(
    () => commands.toggleOrderedList(),
    []
  );

  return (
    <div
      ref={tooltipRef}
      className={`absolute top-0 w-full -mt-11	 z-overlay left-0 cursor-pointer flex justify-center`}
    >
      <div key={"toolbar"} className="flex absolute justify-center ">
        {/* <TagPickerMenuItem
          id={id}
          setPopoverOpenCallback={setPopoverOpenCallback}
          popoverOpen={popoverOpen}
        /> */}
        <UnderlineMenuItem
          active={active.underline()}
          toggle={toggleUnderline}
        />
        <BoldMenuItem toggle={toggleBold} active={active.bold()} />
        <ItalicMenuItem toggle={toggleItalic} active={active.italic()} />

        <CodeMenuItem toggle={toggleCode} active={active.code()} />
        <ImageMenuItem />

        <HeaderMenuItem toggle={toggleStrike} active={active.strike()} />
        <OrderedListMenuItem
          toggle={toggleOrderedList}
          active={active.orderedList()}
        />

        <BulletListMenuItem
          toggle={toggleBulletList}
          active={active.bulletList()}
        />
        <ViewMoreMenuItem />
      </div>
    </div>
  );
});

/* </motion.div>
        ) : (
          <motion.div
            key="toolbar2"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex absolute justify-center "
          >
            <TooltipMenuItem rounded="l-md" onClick={() => toggleAltToolbar()}>
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Lock tile"
              className="pr-5"
              onClick={() => commands.toggleUnderline()}
            >
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Delete tile"
              className="pl-5"
              onClick={() => commands.toggleUnderline()}
            >
              <TrashOutline className="w-4 h-4" />
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Tile information"
              rounded="r-md"
              onClick={() => commands.toggleBold()}
            >
              <InformationCircleOutline className="w-4 h-4" />
            </TooltipMenuItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div> */
