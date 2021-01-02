import * as React from "react";
import { MoveableManagerInterface, Renderer } from "react-moveable";

const buttonPosition = {
  top: (rect) =>
    `right: 10px;
    top: ${rect.height / 2}px;
    transform: translateY(-50%);`,

  left: (rect) =>
    `right: 10px;
  top: ${rect.height / 2}px;
  transform: translateY(-50%);`,

  right: (rect) =>
    `right: 10px;
top: ${rect.height / 2}px;
transform: translateY(-50%);`,

  bottom: (rect) =>
    `right: 10px;
top: ${rect.height / 2}px;
transform: translateY(-50%);`,
};

const movableCSS = (
  moveable: MoveableManagerInterface<any, any>,
  position: "top" | "left" | "right" | "bottom"
) => {
  const rect = moveable.getRect();

  return moveable.useCSS(
    "div",
    `
  {
      position: absolute;

      will-change: transform;
      transform-origin: 0px 0px;
  }
  .moveable-button {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
      background: #4af;
      border-radius: 4px;
      appearance: none;
      border: 0;
      color: white;
      font-weight: bold;
  }
  `
  );
};

export const Editable = {
  name: "editable",
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    const { pos2 } = moveable.state;

    // use css for able
    const EditableViewer = moveable.useCSS(
      "div",
      `
      {
          position: absolute;
          right: 10px;
          top: ${rect.height / 2}px;
          transform: translateY(-50%);
          will-change: transform;
          transform-origin: 0px 0px;
      }
      .moveable-button {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
          background: #4af;
          border-radius: 4px;
          appearance: none;
          border: 0;
          color: white;
          font-weight: bold;
      }
      `
    );
    // Add key (required)
    // Add class prefix moveable-(required)
    return (
      <EditableViewer
        key="editable-viewer"
        className={"moveable-editable"}
        style={{
          transform: `translate(${pos2[0]}px, (${pos2[1]}px) rotate((${rect.rotation}deg) translate(10px)`,
        }}
      >
        <button
          className="moveable-button"
          onClick={() => {
            alert("+");
          }}
        >
          +
        </button>
      </EditableViewer>
    );
  },
} as const;
