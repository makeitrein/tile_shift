import * as React from "react";
import { useRecoilValue } from "recoil";
import { Portal } from "../../general/portal";
import { canvasArrows } from "../../state/arrows";
import { canvasCards, singleSelectedCanvasCardId } from "../../state/cards";
import { EditorManager } from "../text-editor/wysiwig-editor";
import { CanvasArrow } from "./canvas-arrow";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = () => {
  const cards = useRecoilValue(canvasCards);
  const arrows = useRecoilValue(canvasArrows);
  const singleSelectedCardId = useRecoilValue(singleSelectedCanvasCardId);
  console.log(singleSelectedCardId);

  return (
    <>
      <Portal key={singleSelectedCardId} id={singleSelectedCardId}>
        <EditorManager id={singleSelectedCardId} showToolbar={true} />
      </Portal>

      {arrows.map((arrow) => (
        <CanvasArrow id={arrow.id} />
      ))}
      {cards.map(({ id, x, y }) => (
        <CanvasCard
          key={id}
          id={id}
          isOnlySelectedCard={id === singleSelectedCardId}
        />
      ))}
    </>
  );
};
