import * as React from "react";
import Moveable, { MoveableManagerInterface, Renderer } from "react-moveable";

const Editable = {
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
            left: 0px;
            top: 0px;
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
        <button
          className="moveable-button"
          onClick={() => {
            alert("-");
          }}
        >
          -
        </button>
      </EditableViewer>
    );
  },
} as const;
export function CanvasEditor() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="container">
      <div className="target" ref={targetRef}>
        Target
      </div>
      <Moveable
        target={targetRef}
        ables={[Editable]}
        props={{
          editable: true,
        }}
        draggable={true}
        resizable={true}
        rotatable={true}
      />
    </div>
  );
}
