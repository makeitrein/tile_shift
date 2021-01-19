import * as React from "react";
import { useRecoilValue } from "recoil";
import * as cardState from "../../state/cards";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = () => {
  const initialCardValues = useRecoilValue(cardState.initialCardValues);
  const cardIds = useRecoilValue(cardState.cardIds);
  // const arrows = useRecoilValue(arrowState.arrows);
  // const editableCardId = useRecoilValue(cardState.editableCardId);

  console.log(initialCardValues, cardIds);

  return (
    <>
      {/* <Portal key={editableCardId} id={editableCardId}>
        <EditorManager id={editableCardId} showToolbar={true} />
      </Portal> */}

      {/* {arrows.map((arrow) => (
        <CanvasArrow id={arrow.id} />
      ))} */}
      {cardIds.map((id) => (
        <CanvasCard key={id} id={id} isOnlySelectedCard={false} />
      ))}
    </>
  );
};
