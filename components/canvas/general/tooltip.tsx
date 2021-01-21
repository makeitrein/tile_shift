import { AnimatePresence, motion } from "framer-motion";

export const Tooltip = ({ children, direction = "left", visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-10 mx-2 left-0"
        >
          <div className="bg-black bg-white text-xs rounded py-2 px-4 right-0 bottom-full">
            {children}
            <svg
              className="absolute text-white h-2 left-0 ml-3 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TooltipDown = ({ children }) => {
  return (
    <div className="absolute bottom-10 mx-2 left-0">
      <div className="bg-black bg-white text-xs rounded py-2 px-4 right-0 bottom-full">
        {children}
        <svg
          className="absolute text-white h-2 left-0 ml-3 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};
