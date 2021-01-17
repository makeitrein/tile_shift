import React from "react";
import { ArrowSvg, LineOrientation } from "react-simple-arrows";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { canvasArrow, canvasCard } from "../../state/canvas";

export const cardWidth = 140;
export const cardHeight = 76;

const Card = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  margin: 4px;
  background: #fff;
  border-width: 1px;
  border-style: solid;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
  z-index: ${({ isSelected }) => (isSelected ? 3001 : 100)};
  box-shadow: ${({ isDragging }) =>
    isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

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

export const CanvasArrow = ({ id }: Props) => {
  const arrow = useRecoilValue(canvasArrow(id));

  const startCard = useRecoilValue(canvasCard(arrow.start.cardId));
  const endCard = useRecoilValue(canvasCard(arrow.end.cardId));

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
