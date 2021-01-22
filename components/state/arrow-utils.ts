import { useRecoilCallback } from "recoil";
import * as arrowState from "./arrows";
import { Arrow } from "./arrows";

export const defaultArrowValues = {
  theme: "white",
  content: "",
};

export const useCreateInitialArrow = () =>
  useRecoilCallback(({ set }) => {
    return (arrowData: Pick<Arrow, "start" | "end">) => {
      const id = "new-arrow" + new Date().getTime();
      set(arrowState.initialArrowValues, (arrow) => ({
        ...arrow,
        [id]: { ...defaultArrowValues, id, ...arrowData },
      }));
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
