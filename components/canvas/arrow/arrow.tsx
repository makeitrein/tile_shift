import React, { useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";
import { useRecoilValue } from "recoil";
import * as arrowState from "../../state/arrows";
import * as cardState from "../../state/cards";
import { Tooltip } from "../general/tooltip";
import { ArrowSvg, LineOrientation } from "../react-simple-arrows";

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

export const Arrow = React.memo(({ id }: Props) => {
  const arrow = useRecoilValue(arrowState.arrow(id));

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const arrowRef = useOnClickOutside(() => {
    setTooltipVisible(false);
  });

  const startCard = useRecoilValue(
    cardState.cardDimensions(arrow.start.cardId)
  );
  const endCard = useRecoilValue(cardState.cardDimensions(arrow.end.cardId));

  return (
    <span
      className="relative"
      ref={arrowRef}
      onClick={() => {
        // setTooltipVisible(true);
      }}
    >
      <Tooltip visible={tooltipVisible}>Hi</Tooltip>
      <ArrowSvg
        start={arrowRight(startCard)}
        end={arrowLeft(endCard)}
        orientation={LineOrientation.HORIZONTAL}
        strokeWidth="3"
        color="green"
      />
    </span>
  );
});
