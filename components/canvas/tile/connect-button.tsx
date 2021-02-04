import * as React from "react";
import { useRecoilValue } from "recoil";
import { useCreateInitialArrow } from "../../state/arrow-utils";
import { ArrowPoint } from "../../state/arrows";
import { tileId, useCreateInitialTile } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import { tileHeight, tileWidth } from "./tile";

const positionStyle: Record<
  string,
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
  string,
  (params: any) => { x: number; y: number }
> = {
  left: ({ x, y, height }) => ({
    x: x - tileWidth - 100,
    y: y + height / 2 - tileHeight / 2,
  }),
  right: ({ x, y, width, height }) => ({
    x: x + width + 100,
    y: y + height / 2 - tileHeight / 2,
  }),
  top: ({ y, x, width }) => ({
    y: y - tileHeight - 100,
    x: x + width / 2 - tileWidth / 2,
  }),
  bottom: ({ y, height, x, width }) => ({
    y: y + height + 70,
    x: x + width / 2 - tileWidth / 2,
  }),
};

export const oppositePointMap: Record<string, ArrowPoint> = {
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
  const tileDimensions = useRecoilValue(tileState.tileDimensions(id));

  const newTileDimensions = directionDimensionMap[direction](tileDimensions);

  const createInitialTile = useCreateInitialTile();
  const createInitialArrow = useCreateInitialArrow();

  const createAndConnectTile = () => {
    const newTileId = tileId();
    createInitialTile({ dimensions: newTileDimensions, id: newTileId });
    console.log(direction, oppositePointMap[direction]);
    createInitialArrow({
      start: { tileId: id, point: direction },
      end: { tileId: newTileId, point: oppositePointMap[direction] },
    });
  };

  const isCoveringToolbar = direction === "top";

  return (
    <button
      onClick={createAndConnectTile}
      type="button"
      className={`${
        isCoveringToolbar ? "z-force" : "z-overlay"
      } absolute inline-flex items-center p-1  rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none transition`}
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
