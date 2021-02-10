import React from "react";
import { useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import { TagTree } from "./tag-tree";

export const TagPicker = ({ id, closePanel }) => {
  const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

  const handleTagClick = (clickedTag: string) => {
    setTileSettings((tile) => ({ ...tile, tags: [clickedTag] }));
    closePanel();
  };

  return (
    <div style={{ width: 280 }} className="pb-8 pt-3 pl-2">
      <h3 className="text-sm px-5 pt-2 pb-2 font-medium tracking-wide text-gray-500 uppercase">
        TileShift Categories
      </h3>
      <TagTree />
    </div>
  );
};
