import React from "react";
import styled from "styled-components";
import { Editor, EditorManager } from "./editor";

const Card = styled.div`
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  width: 140px;
  height: 76px;
  margin: 4px;
  background: #fff;
  --color: #4af;
  transition: 0.2s box-shadow;
  box-shadow: ${(props) =>
    props.isDragging &&
    "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);"};
`;

export const CanvasCard = ({ id, isDragging, isOnlySelectedCard }) => {
  return (
    <Card id={id} className="cube target" isDragging={isDragging}>
      <EditorManager>
        <Editor id={id} showToolbar={isOnlySelectedCard} />
      </EditorManager>
    </Card>
  );
};
