import { motion, useAnimation } from "framer-motion";
import { ArrowNarrowLeft } from "heroicons-react";
import React, { CSSProperties, useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { TagPickerMulti } from "../tile-menu/tag-picker-multi";
import { TileComments } from "./tile-comments";
import { TileConnectButtons } from "./tile-connect-buttons";
import { TileContent } from "./tile-content";
import { TileTags } from "./tile-tags";

interface TileProps {
  id: string;
}

const flipInitial = {
  rotateY: 0,
};

const flipTransition = {
  duration: 1,
};

const backFlipInitial = {
  rotateY: 180,
};

interface Props {
  id: string;
}

export const TileInner = React.memo(({ id }: Props) => {
  const colorTheme = useRecoilValue(tileState.tileColorTheme(id));

  const frontTile = useAnimation();
  const backTile = useAnimation();

  const flip = useCallback(() => {
    frontTile.start({ rotateY: -180 });
    backTile.start({ rotateY: 0 });
  }, []);

  const flipBack = useCallback(() => {
    frontTile.start({ rotateY: 0 });
    backTile.start({ rotateY: -180 });
  }, []);

  const flipStyle: CSSProperties = useMemo(() => {
    return {
      height: "100%",
      width: "100%",
      position: "absolute",
      WebkitBackfaceVisibility: "hidden",
      ...colorTheme,
    };
  }, [colorTheme]);

  return (
    <>
      <motion.div
        style={flipStyle}
        className="p-5 rounded-xl"
        initial={flipInitial}
        animate={frontTile}
        transition={flipTransition}
      >
        <TileTags onClick={flip} id={id} />
        <TileComments id={id} />
        <div id={`editor-${id}`} />

        <TileConnectButtons id={id} />
        <TileContent id={id} />
      </motion.div>
      <motion.div
        style={flipStyle}
        className="pt-20 p-6 rounded-xl"
        initial={backFlipInitial}
        animate={backTile}
        transition={flipTransition}
      >
        <TagPickerMulti id={id} />
        <div
          onClick={flipBack}
          className="absolute top-3 left-3 cursor-pointer rounded-xl bg-gray-100 text-gray-800 p-2"
        >
          <ArrowNarrowLeft />
        </div>
      </motion.div>
    </>
  );
});
