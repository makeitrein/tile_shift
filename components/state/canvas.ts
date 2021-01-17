import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { cardHeight, cardWidth } from "../canvas/card/canvas-card";
import { colorThemes, ThemeMapOption } from "../canvas/card/color-picker";
import { localStorageEffect } from "./utils";

export interface Card {
  id: string;
  x: number;
  y: number;
  theme: string;
  width: number;
  height: number;
  isDragging: boolean;
  isWysiwygEditorFocused: boolean;
}

export type ArrowPoint = "w" | "e" | "s" | "n";
export type ArrowEnd = "w" | "e" | "s" | "n";
export interface Arrow {
  id: string;
  start: { cardId: string; point: ArrowPoint };
  end: { cardId: string; point: ArrowPoint };
}

export const canvasCards = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [localStorageEffect(`canvas-card-ids`)],
});

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

export const selectedCanvasCards = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-cards",
  default: [],
});

export const selectedCanvasCardIds = selector<string[]>({
  key: "CANVAS/selected-card-ids",
  get: ({ get }) => {
    const cards = get(selectedCanvasCards);
    return cards.map((card) => card.id);
  },
});

export const singleSelectedCanvasCardId = selector<string | null>({
  key: "CANVAS/single-selected-card-id",
  get: ({ get }) => {
    const cards = get(selectedCanvasCardIds);
    return cards.length === 1 ? cards[0] : null;
  },
});

export const singleSelectedCanvasCard = selector<Card | null>({
  key: "CANVAS/single-selected-card",
  get: ({ get }) => {
    const cardId = get(singleSelectedCanvasCardId);
    return cardId ? get(canvasCard(cardId)) : null;
  },
});

export const canvasCard = atomFamily<Card, string>({
  key: "CANVAS/card",
  default: selectorFamily({
    key: "CANVAS/card-default",
    get: (id) => ({ get }) => {
      const cards = get(canvasCards);
      const card = cards.find((card) => card.id === id);

      const theme = card.theme || "white";
      const width = card.width || cardWidth;
      const height = card.height || cardHeight;

      const x = card.x || 0;
      const y = card.y || 0;

      const isDragging = card.isDragging || false;
      const isWysiwygEditorFocused = card.isWysiwygEditorFocused || false;

      return {
        id,
        theme,
        width,
        height,
        x,
        y,
        isDragging,
        isWysiwygEditorFocused,
      };
    },
  }),
  effects_UNSTABLE: (id) => [localStorageEffect(`canvas-card-${String(id)}`)],
});

export const canvasCardColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/card-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(canvasCard(id)).theme];
  },
});
