import React from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { arrowLeft, arrowRight } from "../arrow/arrow";
import { LineOrientation } from "../react-simple-arrows";
import { BasicArrowSvg } from "../react-simple-arrows/ArrowSvg/BasicArrowSvg";
import { minimapSizeDivider } from "./minimap";
export const minimapId = "minimap";

export const MiniMapArrows = React.memo(() => {
  const arrowIds = useRecoilValue(arrowState.arrowIds);

  return (
    <>
      {arrowIds.map((id) => (
        <MiniMapArrow id={id} />
      ))}
    </>
  );
});

interface Props {
  id: string;
}

export const MiniMapArrow = React.memo(({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));
  const { color } = useRecoilValue(arrowState.arrowColorTheme(id));

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  const minimapStart = {
    x: startCard.x / (minimapSizeDivider - 3),
    y: startCard.y / (minimapSizeDivider - 3),
    width: startCard.width / minimapSizeDivider,
    height: startCard.height / minimapSizeDivider,
  };

  const minimapEnd = {
    x: endCard.x / (minimapSizeDivider - 3),
    y: endCard.y / (minimapSizeDivider - 3),
    width: endCard.width / minimapSizeDivider,
    height: endCard.height / minimapSizeDivider,
  };
  return (
    <BasicArrowSvg
      start={arrowRight(minimapStart)}
      end={arrowLeft(minimapEnd)}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth={"1"}
      color={color}
    />
  );
});
