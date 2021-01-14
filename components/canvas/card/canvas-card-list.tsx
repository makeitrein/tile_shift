import * as React from "react";
import { useRecoilValue } from "recoil";
import { canvasCards } from "../../state/canvas";
import { CanvasCard } from "./canvas-card";

export const CanvasCardList = ({ onlySelectedCard }) => {
  const cards = useRecoilValue(canvasCards);

  return (
    <>
      {cards.map(({ id, x, y }) => (
        <CanvasCard
          key={id}
          id={id}
          isOnlySelectedCard={id === onlySelectedCard}
        />
      ))}
    </>
  );
};
