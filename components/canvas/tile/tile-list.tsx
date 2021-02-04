import * as React from "react";
import { useRecoilValue } from "recoil";
import { Portal } from "../../general/portal";
import * as tileState from "../../state/tiles";
import { EditorManager } from "../text-editor/wysiwig-editor";
import { Tile } from "./tile";

export const TileList = React.memo(() => {
  const tileIds = useRecoilValue(tileState.undeletedTileIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableTileId = useRecoilValue(tileState.editableTileId);

  // console.log(initialTileValues, tileIds);

  return (
    <>
      <Portal key={editableTileId} id={editableTileId}>
        <EditorManager id={editableTileId} showToolbar={true} />
      </Portal>

      {/* {arrows.map((arrow) => (
        <CanvasArrow id={arrow.id} />
      ))} */}
      {tileIds.map((id) => (
        <Tile key={id} id={id} />
      ))}
    </>
  );
});