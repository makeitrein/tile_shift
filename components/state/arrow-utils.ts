import { useRecoilCallback } from "recoil";
import * as arrowState from "./arrows";
import { Arrow } from "./arrows";
import { generateArrowRef } from "./db";

export const useCreateInitialArrow = () =>
  useRecoilCallback(({ set }) => {
    return (arrowData: Pick<Arrow, "start" | "end">) => {
      const ref = generateArrowRef();

      const arrow = {
        ...arrowState.defaultArrowValues,
        id: ref.key,
        ...arrowData,
      };

      ref.set(arrow);

      // set(arrowState.initialArrowValues, (arrow) => ({
      //   ...arrow,
      //   [id]: { ...arrowState.defaultArrowValues, id, ...arrowData },
      // }));
    };
  });

export const useSetArrow = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, dimensions: Partial<Arrow>) => {
      set(arrowState.arrow(id), (arrow) => ({
        ...arrow,
        ...dimensions,
      }));
    };
  });
