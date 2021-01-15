import * as React from "react";
import { ArrowSvg, LineOrientation } from "react-simple-arrows";
import { useRecoilValue } from "recoil";
import { canvasCards, singleSelectedCanvasCardId } from "../../state/canvas";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = () => {
  const cards = useRecoilValue(canvasCards);
  const singleSelectedCardId = useRecoilValue(singleSelectedCanvasCardId);

  return (
    <>
      <ArrowSvg
        start={{ x: cards[0].x, y: cards[0].y }}
        end={{ x: cards[1].x, y: cards[1].y }}
        orientation={LineOrientation.HORIZONTAL}
        strokeWidth="3"
        color="green"
      />

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
