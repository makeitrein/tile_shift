import * as React from "react";
import { useRecoilValue } from "recoil";
import { useCreateInitialArrow } from "../../state/arrow-utils";
import { ArrowPoint } from "../../state/arrows";
import { cardId, useCreateInitialCard } from "../../state/card-utils";
import * as cardState from "../../state/cards";
import { cardHeight, cardWidth } from "./card";

const positionStyle: Record<
  ArrowPoint,
  {
    left?: string;
    top?: string;
    transform?: string;
    right?: string;
    bottom?: string;
  }
> = {
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

const directionDimensionMap: Record<
  ArrowPoint,
  (params: any) => { x: number; y: number }
> = {
  left: ({ x, y, height }) => ({
    x: x - 200,
    y: y + height / 2 - cardHeight / 2,
  }),
  right: ({ x, y, width, height }) => ({
    x: x + width + 100,
    y: y + height / 2 - cardHeight / 2,
  }),
  top: ({ y, x, width }) => ({ y: y - 140, x: x + width / 2 - cardWidth / 2 }),
  bottom: ({ y, height, x, width }) => ({
    y: y + height + 70,
    x: x + width / 2 - cardWidth / 2,
  }),
};

export const oppositePointMap: Record<ArrowPoint, ArrowPoint> = {
  right: "left",
  top: "bottom",
  bottom: "top",
  left: "right",
};

interface Props {
  id: string;
  direction: ArrowPoint;
}

export const ConnectButton = React.memo(({ id, direction }: Props) => {
  const cardDimensions = useRecoilValue(cardState.cardDimensions(id));

  const newCardDimensions = directionDimensionMap[direction](cardDimensions);

  const createInitialCard = useCreateInitialCard();
  const createInitialArrow = useCreateInitialArrow();

  const createAndConnectCard = () => {
    const newCardId = cardId();
    createInitialCard({ dimensions: newCardDimensions, id: newCardId });
    console.log(direction, oppositePointMap[direction]);
    createInitialArrow({
      start: { cardId: id, point: direction },
      end: { cardId: newCardId, point: oppositePointMap[direction] },
    });
  };

  const isCoveringToolbar = direction === "top";

  return (
    <button
      onClick={createAndConnectCard}
      type="button"
      className={`${
        isCoveringToolbar ? "z-force" : "z-overlay"
      } absolute inline-flex items-center p-1  rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none ring-offset-color-amber-100 ring-2 ring-offset-2 ring-blue-500 ring-opacity-0  hover:ring-opacity-100  transition`}
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
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
});
