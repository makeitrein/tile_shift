import { useState } from "react";

/*
  contract:
  - output: coordinatesById, setRefForCoordinatesById
*/
export interface Coordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface CoordinatesPerId {
  [index: string]: Coordinates;
}
export const getCoordinatesFromDiv = ({
  div,
  parent,
}: {
  div: HTMLDivElement;
  parent: HTMLDivElement | null;
}) => {
  const box = div.getBoundingClientRect();
  const parentBox = parent.getBoundingClientRect();

  const coordinates = {
    top: box.top - parentBox.top,
    bottom: box.top - parentBox.bottom,
    left: box.bottom - parentBox.left,
    right: box.right - parentBox.right,
  };

  console.log(coordinates);
  return coordinates;
};
export const useCoordinatesPerId = () => {
  // useWindowSize(); // use window size to trigger state update when size changes -> triggers recalculation of coordinates
  const [coordinates, setCoordinates] = useState<CoordinatesPerId>({});
  const setCoordinatesOfDivForId = ({
    id,
    div,
    parent,
  }: {
    id: string;
    div: HTMLDivElement | null;
    parent: HTMLDivElement | null;
  }) => {
    if (!div || !parent) return; // do nothing if div not defined

    console.log(div, parent, "fuck");

    const priorCoordinates = coordinates[id];
    const currentCoordinates = getCoordinatesFromDiv({ div, parent });
    if (
      JSON.stringify(priorCoordinates) !== JSON.stringify(currentCoordinates)
    ) {
      setCoordinates({ ...coordinates, [id]: currentCoordinates });
    }
  };
  return { coordinates, setCoordinatesOfDivForId };
};
