import React from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { directionDimensionMap } from "../arrow/arrow";
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

  const resizeDimensions = ({
    x,
    y,
    width,
    height,
    ...rest
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => ({
    ...rest,
    x: x / (minimapSizeDivider - 3),
    y: y / (minimapSizeDivider - 3),
    width: width / minimapSizeDivider,
    height: height / minimapSizeDivider,
  });
  return (
    <BasicArrowSvg
      start={resizeDimensions(
        directionDimensionMap[arrow.start.point](startCard)
      )}
      end={resizeDimensions(directionDimensionMap[arrow.end.point](endCard))}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth={1}
      color={color}
    />
  );
});
