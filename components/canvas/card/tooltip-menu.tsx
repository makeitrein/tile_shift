import { Popover } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { useRemirror } from "remirror/react";
import { ColorBlock, ColorPicker } from "./color-picker";
const TooltipMenuItem = ({ onClick, active, children, rounded = "" }) => {
  return (
    <div
      className={`rounded-${rounded} shadow-sm relative h-8 -ml-px whitespace-nowrap
    `}
      onClick={onClick}
    >
      <span
        className={`rounded-${rounded} inline-flex h-full items-center justify-center w-full px-3 text-sm  text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800
          ${active && "font-bold bg-gray-100 text-gray-1000"}
        `}
      >
        {children}
      </span>
    </div>
  );
};

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

export const TooltipMenu = ({ id }) => {
  const { commands, active } = useRemirror({ autoUpdate: true });
  const [altToolbar, setAltToolbar] = useState(false);

  return (
    <div className="absolute top-0 w-full -mt-12	z-1000 left-0 cursor-pointer flex justify-center">
      <AnimatePresence>
        {!altToolbar ? (
          <motion.div
            key={"toolbar"}
            variants={variants}
            initial="exit"
            animate="center"
            exit="enter"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex absolute justify-center "
          >
            <TooltipMenuItem
              rounded="l-md"
              onClick={() => commands.toggleBold()}
              active={active.bold()}
            >
              B
            </TooltipMenuItem>
            <TooltipMenuItem
              onClick={() => commands.toggleItalic()}
              active={active.italic()}
            >
              I
            </TooltipMenuItem>
            <TooltipMenuItem
              onClick={() => commands.toggleUnderline()}
              active={active.underline()}
            >
              U
            </TooltipMenuItem>
            <TooltipMenuItem
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
              onClick={() => commands.toggleStrike()}
              active={active.strike()}
            >
              <svg
                className="w-4 h-4"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="strikethrough"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M952 474H569.9c-10-2-20.5-4-31.6-6-15.9-2.9-22.2-4.1-30.8-5.8-51.3-10-82.2-20-106.8-34.2-35.1-20.5-52.2-48.3-52.2-85.1 0-37 15.2-67.7 44-89 28.4-21 68.8-32.1 116.8-32.1 54.8 0 97.1 14.4 125.8 42.8 14.6 14.4 25.3 32.1 31.8 52.6 1.3 4.1 2.8 10 4.3 17.8.9 4.8 5.2 8.2 9.9 8.2h72.8c5.6 0 10.1-4.6 10.1-10.1v-1c-.7-6.8-1.3-12.1-2-16-7.3-43.5-28-81.7-59.7-110.3-44.4-40.5-109.7-61.8-188.7-61.8-72.3 0-137.4 18.1-183.3 50.9-25.6 18.4-45.4 41.2-58.6 67.7-13.5 27.1-20.3 58.4-20.3 92.9 0 29.5 5.7 54.5 17.3 76.5 8.3 15.7 19.6 29.5 34.1 42H72c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h433.2c2.1.4 3.9.8 5.9 1.2 30.9 6.2 49.5 10.4 66.6 15.2 23 6.5 40.6 13.3 55.2 21.5 35.8 20.2 53.3 49.2 53.3 89 0 35.3-15.5 66.8-43.6 88.8-30.5 23.9-75.6 36.4-130.5 36.4-43.7 0-80.7-8.5-110.2-25-29.1-16.3-49.1-39.8-59.7-69.5-.8-2.2-1.7-5.2-2.7-9-1.2-4.4-5.3-7.5-9.7-7.5h-79.7c-5.6 0-10.1 4.6-10.1 10.1v1c.2 2.3.4 4.2.6 5.7 6.5 48.8 30.3 88.8 70.7 118.8 47.1 34.8 113.4 53.2 191.8 53.2 84.2 0 154.8-19.8 204.2-57.3 25-18.9 44.2-42.2 57.1-69 13-27.1 19.7-57.9 19.7-91.5 0-31.8-5.8-58.4-17.8-81.4-5.8-11.2-13.1-21.5-21.8-30.8H952c4.4 0 8-3.6 8-8v-60a8 8 0 00-8-7.9z"></path>
              </svg>
            </TooltipMenuItem>

            <TooltipMenuItem
              onClick={() => commands.toggleHeading({ level: 2 })}
              active={active.heading()}
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </TooltipMenuItem>

            <Popover
              placement="topLeft"
              trigger="click"
              content={<ColorPicker id={id} />}
              arrowPointAtCenter
            >
              <span>
                <TooltipMenuItem rounded="r-md">
                  <ColorBlock id={id} />
                </TooltipMenuItem>
              </span>
            </Popover>

            <TooltipMenuItem
              rounded="r-md"
              onClick={() => setAltToolbar(true)}
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
              rounded="l-md"
              onClick={() => setAltToolbar(false)}
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
              onClick={() => commands.toggleUnderline()}
              active={active.underline()}
            >
              + Tags
            </TooltipMenuItem>
            <TooltipMenuItem
              onClick={() => commands.toggleBold()}
              active={active.bold()}
            >
              + Assignees
            </TooltipMenuItem>
            <TooltipMenuItem
              rounded="r-md"
              onClick={() => commands.toggleItalic()}
              active={active.italic()}
            >
              + Due Date
            </TooltipMenuItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
