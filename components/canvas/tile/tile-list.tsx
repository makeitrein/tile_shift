import dynamic from "next/dynamic";
import * as React from "react";
import { MoveableInterface } from "react-moveable";
import { useRecoilValue } from "recoil";
import { Portal } from "../../general/portal";
import * as tileState from "../../state/tiles";
import { Tile } from "./tile";

const EditorManager = dynamic(
  () =>
    import("../text-editor/wysiwig-editor").then((mod) => mod.EditorManager),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
);

interface Props {
  moveable: MoveableInterface;
}
export const TileList = React.memo(({ moveable }: Props) => {
  const tileIds = useRecoilValue(tileState.undeletedTileIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableTileId = useRecoilValue(tileState.editableTileId);

  return (
    <>
      <Portal key={editableTileId} id={`editor-${editableTileId}`}>
        <EditorManager moveable={moveable} id={editableTileId} />
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
