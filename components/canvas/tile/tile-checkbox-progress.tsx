import React from "react";
import { useRecoilValue } from "recoil";
import * as tileState from "../../state/tiles";

interface TileProps {
  id: string;
}

export const TileCheckboxProgress = React.memo(({ id }: TileProps) => {
  const tileContent = useRecoilValue(tileState.tileContent(id));

  const allCheckboxes =
    tileContent.content.match(/input type="checkbox"( checked)?/g) || [];

  const checkedCheckboxesCount = (
    tileContent.content.match(/input type="checkbox" checked/g) || []
  ).length;

  return (
    <div className="absolute flex top-7 right-4">
      {allCheckboxes.map((checkbox) => {
        console.log(checkbox);
        const isChecked = checkbox.includes("checked");
        const activeColor =
          allCheckboxes.length === checkedCheckboxesCount
            ? "bg-green-500"
            : "bg-blue-500";
        return (
          <div
            className={`w-4 h-3 text-center flex items-center justify-center transition ${
              isChecked ? activeColor : "bg-gray-500"
            } mr-1`}
          ></div>
        );
      })}
    </div>
  );
});
