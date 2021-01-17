import * as React from "react";
import { useRecoilValue } from "recoil";
import {
  canvasArrows,
  canvasCards,
  singleSelectedCanvasCardId,
} from "../../state/canvas";
import { CanvasArrow } from "./canvas-arrow";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = () => {
  const cards = useRecoilValue(canvasCards);
  const arrows = useRecoilValue(canvasArrows);
  const singleSelectedCardId = useRecoilValue(singleSelectedCanvasCardId);

  return (
    <>
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
