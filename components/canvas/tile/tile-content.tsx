import parse from "html-react-parser";
import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";
import { EditableArticle } from "../text-editor/wysiwig-editor";

interface TileProps {
  id: string;
}

export const TileContent = React.memo(({ id }: TileProps) => {
  const tileContent = useRecoilValue(tileState.tileContent(id));
  const editableTileId = useRecoilValue(tileState.editableTileId);

  console.log(tileContent.content);

  const allCheckboxesCount = (
    tileContent.content.match(/input type="checkbox"/g) || []
  ).length;

  const checkedCheckboxesCount = (
    tileContent.content.match(/input type="checkbox" checked/g) || []
  ).length;

  console.log(allCheckboxesCount, checkedCheckboxesCount);

  const isEditable = id === editableTileId;
  return isEditable ? null : (
    <EditableArticle>{parse(tileContent.content || "")}</EditableArticle>
  );
});
