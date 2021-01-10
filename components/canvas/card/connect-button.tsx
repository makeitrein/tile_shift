import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { canvasCard, canvasCards } from "../../state/canvas";

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

const newCardLocationByPosition = {
  left: ({ x = 0 }) => ({ x: x - 30 }),
  right: ({ x = 0, width = 140 }) => ({ x: x + width + 30 }),
  top: ({ y = 0 }) => ({ y: y - 30 }),
  bottom: ({ y = 0 }) => ({ y: y - 30 }),
};

export const ConnectButton = ({ id, direction }) => {
  const card = useRecoilValue(canvasCard(id));

  const [cards, setCards] = useRecoilState(canvasCards);

  const addNearbyCard = () => {
    setCards((oldCards) => [
      ...oldCards,
      {
        ...card,
        ...newCardLocationByPosition[direction](card),
        id: Math.random(),
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
