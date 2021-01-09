import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { canvasCard, canvasCardStyle } from "../../state/canvas";
import { EditorManager } from "./wysiwig-editor";

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
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  box-shadow: ${(props) =>
    props.isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

export const CanvasCard = ({ id, x, y, isDragging, isOnlySelectedCard }) => {
  const card = useRecoilValue(canvasCard(id));
  const style = useRecoilValue(canvasCardStyle(id));
  return (
    <Card
      id={card.id}
      x={card.x}
      y={card.y}
      style={style}
      className="canvas-card"
      isDragging={isDragging}
    >
      <EditorManager id={card.id} showToolbar={isOnlySelectedCard} />
      <CanvasCardBottom />
    </Card>
  );
};

export const CanvasCardBottom = () => {
  return (
    <div className="border-white border-t  divide-y divide-gray-200">
      <div className="pt-6 pb-8 px-6">
        <div className="text-xs font-medium tracking-wide uppercase">
          Assignee
        </div>
        <ul className="mt-6 space-y-4">
          <li className="flex space-x-3">
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm ">
              Potenti felis, in cras at at ligula nunc.{" "}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
