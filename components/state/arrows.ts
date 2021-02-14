import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { colorThemes, ThemeMapOption } from "../canvas/arrow-menu/color-picker";
import { arrowRef, arrowsRef, syncData, syncIds } from "./db";

export const defaultArrowValues: Arrow = {
  id: "1",
  theme: "green",
  content: "",
  strokeWidth: 3,
  direction: "right",
  start: null,
  end: null,
  deleted: false,
};

export type ArrowPoint =
  | "topLeft"
  | "top"
  | "topRight"
  | "leftTop"
  | "left"
  | "leftBottom"
  | "rightTop"
  | "right"
  | "rightBottom"
  | "bottomLeft"
  | "bottom"
  | "bottomRight";
export interface Arrow {
  id: string;
  start: { tileId: string; point: ArrowPoint } | null;
  end: { tileId: string; point: ArrowPoint } | null;
  theme: string;
  content: string;
  strokeWidth: number;
  direction: string;
  deleted: boolean;
}

export const initialArrowValues = atom<Record<string, Arrow>>({
  key: "ARROW/initial-arrows-query",
  default: {},
});

export const arrowIds = atom<string[]>({
  key: "ARROW/arrows-ids",
  default: [],
  effects_UNSTABLE: [syncIds(arrowsRef())],
});

export const arrow = atomFamily<Arrow, string>({
  key: "ARROW/arrow-settings",
  default: defaultArrowValues,
  effects_UNSTABLE: (arrowId) => [syncData(arrowRef(arrowId))],
});

export const arrowColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "ARROW/arrow-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(arrow(id)).theme];
  },
});

// export const selectedArrowIds = selector<string[]>({
//   key: "ARROW/undeleted-arrow-ids",
//   get: ({ get }) => {
//     return get(arrowIds)
//       .map((id) => get(arrow(id)))
//       .filter();
//   },
// });

export const undeletedArrowIds = selector<string[]>({
  key: "ARROW/undeleted-arrow-ids",
  get: ({ get }) => {
    return get(arrowIds).filter((id) => !get(arrow(id)).deleted);
  },
});
