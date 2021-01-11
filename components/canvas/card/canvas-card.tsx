import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { canvasCard, canvasCardStyle } from "../../state/canvas";
import { ConnectButton } from "./connect-button";

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
  box-shadow: ${(props) =>
    props.isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

export const CanvasCard = ({ id, x, y, isDragging, isOnlySelectedCard }) => {
  console.log(id);

  const card = useRecoilValue(canvasCard(id));
  const style = useRecoilValue(canvasCardStyle(id));

  const transformStyle = isDragging
    ? {}
    : { transform: `translate(${card.x}px, ${card.y}px)` };

  return (
    <Card
      id={id}
      isDragging={card.isDragging}
      className="canvas-card"
      style={{
        ...style,
        ...transformStyle,
      }}
    >
      <article />
      {/* <EditorManager id={card.id} showToolbar={isOnlySelectedCard} /> */}

      {isOnlySelectedCard && (
        <>
          <ConnectButton id={id} direction="left" />
          <ConnectButton id={id} direction="top" />
          <ConnectButton id={id} direction="right" />
          <ConnectButton id={id} direction="bottom" />
        </>
      )}
      <div className="absolute bottom-2 right-2 whitespace-nowrap flex w-full justify-end align-middle text-center items-center">
        <span className="inline-flex mr-1 items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800">
          {card.x}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800">
          {card.y}
        </span>
      </div>
      {/* <CanvasCardBottom /> */}
    </Card>
  );
};

export const CanvasCardBottom = () => {
  return (
    <div className="absolute bottom-2 right-2 whitespace-nowrap flex w-full justify-end align-middle text-center items-center">
      <span className="inline-flex mr-1 items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800">
        High Priority
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-pink-100 text-pink-800">
        Due 12/24/16
      </span>
    </div>
  );
};
