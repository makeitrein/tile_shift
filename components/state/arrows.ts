import { atom, atomFamily, selector, selectorFamily } from "recoil";

export type ArrowPoint = "w" | "e" | "s" | "n";
export type ArrowEnd = "w" | "e" | "s" | "n";
export interface Arrow {
  id: string;
  start: { arrowId: string; point: ArrowPoint };
  end: { arrowId: string; point: ArrowPoint };
  theme: string;
  content: string;
}

export const initialArrowValues = atom<Record<string, Arrow>>({
  key: "CANVAS/initial-arrows-query",
  default: {},
});

export const arrowIds = selector<string[]>({
  key: "CANVAS/arrows-ids",
  get: ({ get }) => {
    return Object.keys(get(initialArrowValues));
  },
});

export const arrow = atomFamily<Arrow, string>({
  key: "CANVAS/arrow-settings",
  default: selectorFamily({
    key: "CANVAS/arrow-settings-default",
    get: (id) => ({ get }) => {
      const arrows = get(initialArrowValues);
      const { id, theme, content, start, end } = arrows[id];

      return {
        id,
        theme,
        content,
        start,
        end,
      };
    },
  }),
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

// export const arrowColorTheme = selectorFamily<ThemeMapOption, string>({
//   key: "CANVAS/arrow-color-theme",
//   get: (id) => ({ get }) => {
//     return colorThemes[get(arrowSettings(id)).theme];
//   },
// });
