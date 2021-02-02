import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { ArrowMenu } from "../arrow-menu/arrow-menu";
import { ArrowSvg, LineOrientation } from "../react-simple-arrows";

interface Props {
  id: string;
}

export const directionDimensionMap: Record<
  arrowState.ArrowPoint,
  (params: any) => { x: number; y: number }
> = {
  right: ({ x, y, width, height }) => ({
    x: x + width,
    y: y + height / 2,
  }),
  left: ({ x, y, height }) => ({
    x: x,
    y: y + height / 2,
  }),
  top: ({ y, x, width }) => ({ y: y, x: x + width / 2 }),
  bottom: ({ y, height, x, width }) => ({
    y: y + height,
    x: x + width / 2,
  }),
};

export const Arrow = React.memo(({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));
  const { color } = useRecoilValue(arrowState.arrowColorTheme(id));

  const [menuVisible, setMenuVisible] = useState(false);

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  return (
    <ArrowSvg
      setMenuVisible={setMenuVisible}
      start={directionDimensionMap[arrow.start.point](startCard)}
      end={directionDimensionMap[arrow.end.point](endCard)}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth={arrow.strokeWidth.toString()}
      color={color}
    >
      {menuVisible && <ArrowMenu id={id} />}
    </ArrowSvg>
  );
});
