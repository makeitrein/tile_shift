import * as React from "react";
import { useRecoilValue } from "recoil";
import { Portal } from "../../general/portal";
import * as cardState from "../../state/cards";
import { EditorManager } from "../text-editor/wysiwig-editor";
import { Card } from "./card";

export const CardList = React.memo(() => {
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  const editableCardId = useRecoilValue(cardState.editableCardId);

  // console.log(initialCardValues, cardIds);

  return (
    <>
      <Portal key={editableCardId} id={editableCardId}>
        <EditorManager id={editableCardId} showToolbar={true} />
      </Portal>

      {/* {arrows.map((arrow) => (
        <CanvasArrow id={arrow.id} />
      ))} */}
      {cardIds.map((id) => (
        <Card key={id} id={id} />
      ))}
    </>
  );
});
