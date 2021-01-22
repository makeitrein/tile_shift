import React from "react";
import { ArrowSvg, LineOrientation } from "react-simple-arrows";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";

interface Props {
  id: string;
}

const arrowLeft = ({ x, y, height }) => ({
  x: x,
  y: y + height / 2,
});

const arrowRight = ({ x, y, width, height }) => ({
  x: x + width,
  y: y + height / 2,
});

const arrowTop = ({ y, x, width }) => ({ y: y, x: x + width / 2 });

const arrowBottom = ({ y, height, x, width }) => ({
  y: y + height,
  x: x + width / 2,
});

export const Arrow = ({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  return (
    <ArrowSvg
      start={arrowRight(startCard)}
      end={arrowLeft(endCard)}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth="3"
      color="green"
    />
  );
};
