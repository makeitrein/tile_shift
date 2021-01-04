import * as React from "react";
import { MoveableManagerInterface, Renderer } from "react-moveable";
import { TooltipMenu } from "./menu";

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
          z-index: 1000;
          position: relative;
      }
      .moveable-button {
          position: absolute;
          z-index: 100;
          text-align: center;
          padding: 0;
          line-height: 20px;
          width: 20px;
          height: 20px;
          font-size: 14px;
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

      .menu-top {
        position: absolute;
        top: -40px;
        left: ${rect.width / 2}px;
        z-index: 1000;
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

        {/* {moveable.props.showToolbar && ( */}
        <div className="menu-top">
          <TooltipMenu moveable={moveable} />
        </div>
        {/* )} */}

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
