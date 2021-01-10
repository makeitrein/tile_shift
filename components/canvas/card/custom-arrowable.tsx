import * as React from "react";
import { MoveableManagerInterface, Renderer } from "react-moveable";
import { useRecoilState } from "recoil";
import { canvasCards } from "../../state/canvas";

const positionStyle = {
  left: {
    left: "-34px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  right: {
    right: "-34px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  top: {
    left: "50%",
    top: "-38px",
    transform: "translateX(-50%)",
  },
  bottom: {
    left: "50%",
    bottom: "-34px",
    transform: "translateX(-50%)",
  },
};

export const AddButton = ({ direction }) => {
  const [cards, setCards] = useRecoilState(canvasCards);

  const addNearbyCard = () => {
    alert("hi");
    setCards((oldCards) => [
      ...oldCards,
      {
        id: Math.random(),
        x: 0,
        y: 0,
      },
    ]);
  };

  return (
    <button
      onClick={addNearbyCard}
      type="button"
      className={`z-1000 absolute inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      style={positionStyle[direction]}
    >
      <svg
        className="h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  );
};

export const CustomArrowable = {
  name: "customArrowable",
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

      .moveable-button-left {
        right: 12px;
        top: ${rect.height / 2}px;
        transform: translateY(-50%);
      }

      .moveable-button-top {
        left: ${rect.width / 2}px;
        top: -38px;
        transform: translateX(-50%);
      }

      .moveable-button-right {
        left: ${rect.width + 12}px;
        top: ${rect.height / 2}px;
        transform: translateY(-50%);
      }

      .moveable-button-bottom {
        left: ${rect.width / 2}px;
        top: ${rect.height + 12}px;
        transform: translateX(-50%);
      }
      `
    );
    return (
      <EditableViewer
        key="editable-viewer"
        className={"moveable-editable"}
        style={{
          transform: `translate(${pos2[0]}px, (${pos2[1]}px) rotate((${rect.rotation}deg) translate(10px)`,
        }}
      >
        <AddButton direction="left" />
        <AddButton direction="top" />
        <AddButton direction="right" />
        <AddButton direction="bottom" />
      </EditableViewer>
    );
  },
} as const;
