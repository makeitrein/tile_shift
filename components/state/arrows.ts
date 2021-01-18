import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { Arrow, canvasCards } from "./cards";
import { localStorageEffect } from "./utils";

export const canvasArrows = atom<Arrow[]>({
  key: "CANVAS/arrows",
  default: selector({
    key: "CANVAS/arrow-default",
    get: ({ get }) => {
      const cards = get(canvasCards);
      return [
        {
          id: "faker",
          start: { cardId: cards[0].id || "", point: "w" },
          end: { cardId: cards[1].id || "", point: "e" },
        },
      ];
    },
  }),
});

export const canvasArrow = atomFamily<Arrow, string>({
  key: "CANVAS/arrow",
  default: selectorFamily({
    key: "CANVAS/arrow-default",
    get: (id) => ({ get }) => {
      const arrows = get(canvasArrows);
      const arrow = arrows.find((arrow) => arrow.id === id);

      return arrow;
    },
  }),
  effects_UNSTABLE: (id) => [localStorageEffect(`canvas-card-${String(id)}`)],
});
