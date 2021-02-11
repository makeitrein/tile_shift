import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { colorThemes, ThemeMapOption } from "../canvas/arrow-menu/color-picker";
import { arrowRef, arrowsRef, syncData, syncIds } from "./db";

export const defaultArrowValues = {
  id: "1",
  theme: "green",
  content: "",
  strokeWidth: 3,
  direction: "right",
  start: null,
  end: null,
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
}

export const initialArrowValues = atom<Record<string, Arrow>>({
  key: "CANVAS/initial-arrows-query",
  default: {},
});

export const arrowIds = atom<string[]>({
  key: "CANVAS/arrows-ids",
  default: [],
  effects_UNSTABLE: [syncIds(arrowsRef())],
});

export const arrow = atomFamily<Arrow, string>({
  key: "CANVAS/arrow-settings",
  default: defaultArrowValues,
  effects_UNSTABLE: (arrowId) => [
    syncData(arrowRef(arrowId), [
      "theme",
      "content",
      "stroke",
      "direction",
      "start",
      "end",
    ]),
  ],
});

// HTML DOM targets that moveable interacts with
export const selectedArrowTargets = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-arrow-targets",
  default: [],
});

// IDs that correspond to both a DOM arrow and canvasArrow
export const selectedArrowIds = selector<string[]>({
  key: "CANVAS/selected-arrow-ids",
  get: ({ get }) => {
    const arrows = get(selectedArrowTargets);
    return arrows.map((arrow) => arrow.id);
  },
});

export const editableArrowId = selector<string | null>({
  key: "CANVAS/editable-arrow-id",
  get: ({ get }) => {
    const ids = get(selectedArrowIds);
    return ids.length === 1 ? ids[0] : null;
  },
});

export const arrowColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/arrow-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(arrow(id)).theme];
  },
});
