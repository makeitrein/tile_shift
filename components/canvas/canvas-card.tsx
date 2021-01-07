import React from "react";
import styled from "styled-components";

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
  --color: #4af;
  transition: 0.2s box-shadow;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  box-shadow: ${(props) =>
    props.isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

export const CanvasCard = ({ id, x, y, isDragging, isOnlySelectedCard }) => {
  return (
    <Card id={id} x={x} y={y} className="cube target" isDragging={isDragging}>
      <article />
      {/* <EditorManager>
        <Editor id={id} showToolbar={isOnlySelectedCard} />
      </EditorManager> */}
    </Card>
  );
};
