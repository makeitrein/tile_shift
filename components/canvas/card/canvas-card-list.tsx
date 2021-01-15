import * as React from "react";
import { useRecoilValue } from "recoil";
import { canvasCards, singleSelectedCanvasCardId } from "../../state/canvas";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = () => {
  const cards = useRecoilValue(canvasCards);
  const singleSelectedCardId = useRecoilValue(singleSelectedCanvasCardId);

  return (
    <>
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
