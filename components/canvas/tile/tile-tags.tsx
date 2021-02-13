import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { Tag } from "../tile-menu/tag";

interface Props {
  id: string;
  onClick: () => void;
}
export const TileTags = React.memo(({ id, onClick }: Props) => {
  const { tags } = useRecoilValue(tileState.tileSettings(id));

  return (
    <div className="mt-0">
      {tags.map((tag) => (
        <Tag
          className="cursor-pointer mr-1"
          active={true}
          onClick={onClick}
          name={tag}
        ></Tag>
      ))}
    </div>
  );
});
