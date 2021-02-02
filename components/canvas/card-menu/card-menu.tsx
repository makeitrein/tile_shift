import { Classes, Popover2 } from "@blueprintjs/popover2";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  InformationCircleOutline,
  LinkOutline,
  PhotographOutline,
  TagOutline,
  TrashOutline,
} from "heroicons-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { useRecoilState } from "recoil";
import { useRemirror } from "remirror/react";
import { tagPickerOpen } from "../../state/ui";
import { LinkWysiwygCreator } from "./link-wysiwyg-creator";
import { TagPicker } from "./tag-picker";
import { TooltipMenuItem } from "./tooltip-menu-item";

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

export const CardMenu = ({ id }) => {
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

  return (
    <div
      ref={tooltipRef}
      className={`absolute top-0 w-full -mt-11	z-overlay left-0 cursor-pointer flex justify-center`}
    >
      <AnimatePresence>
        {!altToolbar ? (
          <motion.div
            key={"toolbar"}
            variants={variants}
            initial={initialAnimation ? "exit" : false}
            animate="center"
            exit="enter"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex absolute justify-center "
          >
            <Popover2
              isOpen={popoverOpen}
              onInteraction={(state) => setPopoverOpen(state)}
              interactionKind="click"
              popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
              placement="left"
              className="z-force"
              fill={true}
              content={
                <div>
                  <TagPicker id={id} />
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
                  <TagOutline className="w-4 h-4 mt-1.5 relative top-px" />
                </TooltipMenuItem>
              )}
            />

            <Popover2
              interactionKind="click"
              popoverClassName={Classes.POPOVER2_CONTENT}
              placement="top"
              className="z-force"
              fill={true}
              content={<LinkWysiwygCreator />}
              renderTarget={({ isOpen, ref, ...targetProps }) => (
                <TooltipMenuItem
                  popoverIsOpen={isOpen}
                  label="Link"
                  ref={ref}
                  {...targetProps}
                >
                  <LinkOutline className="w-4 h-4 mt-1.5 relative top-px" />
                </TooltipMenuItem>
              )}
            />

            <TooltipMenuItem
              label="Bold text"
              onClick={() => commands.toggleBold()}
              active={active.bold()}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="bold"
                className="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M697.8 481.4c33.6-35 54.2-82.3 54.2-134.3v-10.2C752 229.3 663.9 142 555.3 142H259.4c-15.1 0-27.4 12.3-27.4 27.4v679.1c0 16.3 13.2 29.5 29.5 29.5h318.7c117 0 211.8-94.2 211.8-210.5v-11c0-73-37.4-137.3-94.2-175.1zM328 238h224.7c57.1 0 103.3 44.4 103.3 99.3v9.5c0 54.8-46.3 99.3-103.3 99.3H328V238zm366.6 429.4c0 62.9-51.7 113.9-115.5 113.9H328V542.7h251.1c63.8 0 115.5 51 115.5 113.9v10.8z"></path>
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Italic text"
              onClick={() => commands.toggleItalic()}
              active={active.italic()}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="italic"
                className="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M798 160H366c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h181.2l-156 544H229c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8H474.4l156-544H798c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Add image"
              className="pr-5"
              onClick={() => commands.toggleUnderline()}
              active={active.underline()}
            >
              <PhotographOutline className="w-4 h-4" />
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Highlight text"
              className="pl-5"
              onClick={() => commands.toggleCode()}
              active={active.code()}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="highlight"
                className="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M957.6 507.4L603.2 158.2a7.9 7.9 0 00-11.2 0L353.3 393.4a8.03 8.03 0 00-.1 11.3l.1.1 40 39.4-117.2 115.3a8.03 8.03 0 00-.1 11.3l.1.1 39.5 38.9-189.1 187H72.1c-4.4 0-8.1 3.6-8.1 8V860c0 4.4 3.6 8 8 8h344.9c2.1 0 4.1-.8 5.6-2.3l76.1-75.6 40.4 39.8a7.9 7.9 0 0011.2 0l117.1-115.6 40.1 39.5a7.9 7.9 0 0011.2 0l238.7-235.2c3.4-3 3.4-8 .3-11.2zM389.8 796.2H229.6l134.4-133 80.1 78.9-54.3 54.1zm154.8-62.1L373.2 565.2l68.6-67.6 171.4 168.9-68.6 67.6zM713.1 658L450.3 399.1 597.6 254l262.8 259-147.3 145z"></path>
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Header text"
              onClick={() => commands.toggleStrike()}
              active={active.strike()}
            >
              <svg
                className="w-4 h-4"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="font-size"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M920 416H616c-4.4 0-8 3.6-8 8v112c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h60v320h-46c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h164c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-46V480h60v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V424c0-4.4-3.6-8-8-8zM656 296V168c0-4.4-3.6-8-8-8H104c-4.4 0-8 3.6-8 8v128c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-64h168v560h-92c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-92V232h168v64c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8z"></path>
              </svg>
            </TooltipMenuItem>

            <TooltipMenuItem
              label="Ordered list"
              onClick={() => commands.toggleOrderedList()}
              active={active.orderedList()}
            >
              <svg
                className="w-4 h-4"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="ordered-list"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M920 760H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-568H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM216 712H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h72.4v20.5h-35.7c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h35.7V838H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4V716c0-2.2-1.8-4-4-4zM100 188h38v120c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V152c0-4.4-3.6-8-8-8h-78c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4zm116 240H100c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h68.4l-70.3 77.7a8.3 8.3 0 00-2.1 5.4V592c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4v-36c0-2.2-1.8-4-4-4h-68.4l70.3-77.7a8.3 8.3 0 002.1-5.4V432c0-2.2-1.8-4-4-4z"></path>
              </svg>
            </TooltipMenuItem>
            <TooltipMenuItem
              label="Unordered list"
              onClick={() => commands.toggleBulletList()}
              active={active.bulletList()}
            >
              <svg
                className="w-4 h-4"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="unordered-list"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
              </svg>
            </TooltipMenuItem>

            <TooltipMenuItem
              label="View more"
              rounded="r-md"
              onClick={() => toggleAltToolbar()}
              active={active.strike()}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </TooltipMenuItem>
          </motion.div>
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
            <TooltipMenuItem
              label="Go back"
              rounded="l-md"
              onClick={() => toggleAltToolbar()}
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
    </div>
  );
};
