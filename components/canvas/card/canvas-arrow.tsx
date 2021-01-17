import React from "react";
import { ArrowSvg, LineOrientation } from "react-simple-arrows";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Arrow, canvasCard } from "../../state/canvas";

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
  arrow: Arrow;
}

export const CanvasArrow = ({ arrow }: Props) => {
  const startCard = useRecoilValue(canvasCard(arrow.start.cardId));
  const endCard = useRecoilValue(canvasCard(arrow.end.cardId));

  return (
    <ArrowSvg
      start={{ x: startCard.x, y: startCard.y }}
      end={{ x: endCard.x, y: endCard.y }}
      orientation={LineOrientation.HORIZONTAL}
      strokeWidth="3"
      color="green"
    />
  );
};
