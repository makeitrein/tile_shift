import { BoldOutlined } from "@ant-design/icons";
import * as React from "react";
import { MoveableManagerInterface, Renderer } from "react-moveable";

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

export const CustomArrowable = {
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

          will-change: transform;
          transform-origin: 0px 0px;
      }
      .moveable-button {
          position: absolute;
          text-align: center;
          padding: 0;
          line-height: 20px;
          width: 20px;
          height: 20px;
          margin-bottom: 4px;
          background: #4af;
          border-radius: 4px;
          appearance: none;
          border: 0;
          color: white;
          font-weight: bold;
      }

      .moveable-button-left {
        right: 10px;
        top: ${rect.height / 2}px;
        transform: translateY(-50%);
      }

      .moveable-button-top {
        top: -28px;
        left: ${rect.width / 2}px;
        transform: translateX(-50%);
      }

      .moveable-button-right {
        left: ${rect.width + 10}px;
        top: ${rect.height / 2}px;
        transform: translateY(-50%);
      }

      .moveable-button-bottom {
        left: ${rect.width / 2}px;
        top: ${rect.height + 10}px;
        transform: translateX(-50%);
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
          className="moveable-button moveable-button-left"
          onClick={() => {
            alert("+");
          }}
        >
          +
        </button>

        <button
          className="moveable-button moveable-button-top"
          onClick={() => {
            alert("+");
          }}
        >
          <BoldOutlined size={10} />
        </button>

        <button
          className="moveable-button moveable-button-right"
          onClick={() => {
            alert("+");
          }}
        >
          +
        </button>

        <button
          className="moveable-button moveable-button-bottom"
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
