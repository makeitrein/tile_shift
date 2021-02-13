import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import { Tag } from "./tag";
import { defaultTags } from "./tag-data";

export const TagPickerMulti = ({ id }) => {
  const [{ tags }, setTileSettings] = useRecoilState(
    tileState.tileSettings(id)
  );

  const handleTagClick = useCallback(
    (clickedTag: string) => {
      const newTags = tags.includes(clickedTag)
        ? tags.filter((tag) => tag !== clickedTag)
        : [...tags, clickedTag];

      setTileSettings((settings) => ({
        ...settings,
        tags: newTags,
      }));
    },
    [tags]
  );

  return (
    <div className="flex flex-wrap">
      {defaultTags.map(({ name }) => (
        <div className="pb-2 pr-2" onClick={() => handleTagClick(name)}>
          <Tag name={name} active={tags.includes(name)} />
        </div>
      ))}
    </div>
  );
};
