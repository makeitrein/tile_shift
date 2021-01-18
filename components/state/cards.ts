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

// Provides default data for each initial canvas card, does not contain up-to-date data
export const canvasCardDefaults = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [localStorageEffect(`canvas-card-ids`)],
});

// The actual card data found via the atomFamily
export const canvasCards = selector<Card[]>({
  key: "CANVAS/canvas-cards",
  get: ({ get }) => {
    const cardDefaults = get(canvasCardDefaults);
    return cardDefaults.map((card) => get(canvasCard(card.id)));
  },
});

// HTML DOM targets that moveable interacts with
export const selectedCanvasCardTargets = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-card-targets",
  default: [],
});

// IDs that correspond to both a DOM card and canvasCard
export const selectedCanvasCardIds = selector<string[]>({
  key: "CANVAS/selected-card-ids",
  get: ({ get }) => {
    const cards = get(selectedCanvasCardTargets);
    return cards.map((card) => card.id);
  },
});

// Fully realized selected canvas card
export const selectedCanvasCards = selector<Card[]>({
  key: "CANVAS/selected-cards",
  get: ({ get }) => {
    const cardIds = get(selectedCanvasCardIds);
    return cardIds.map((id) => get(canvasCard(id)));
  },
});

// Guidelines only apply to nearby selected canvasCards
export const selectedCanvasCardGuidelines = selector<string[]>({
  key: "CANVAS/selected-canvas-guidelines",
  get: ({ get }) => {
    const selectedCards = get(selectedCanvasCards);
    const selectedCardIds = get(selectedCanvasCardIds);
    const allCards = get(canvasCards);

    const x = selectedCards.map((card) => card.x);
    const xMin = Math.min(...x);
    const xMax = Math.max(...x);

    const y = selectedCards.map((card) => card.y);
    const yMin = Math.min(...y);
    const yMax = Math.max(...y);

    const allowedDiff = 300;

    return allCards
      .filter((card) => {
        return !selectedCardIds.includes(card.id);
      })
      .filter((card) => {
        console.log(xMin, card.x);
        const validX =
          Math.abs(xMin - card.x) < allowedDiff ||
          Math.abs(xMax - card.x) < allowedDiff;

        // console.log("validX", validX);
        const validY =
          Math.abs(yMin - card.y) < allowedDiff ||
          Math.abs(yMax - card.y) < allowedDiff;

        // console.log("validY", validY);
        return validY && validX;
      })
      .map((card) => card.id);
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
      const cards = get(canvasCardDefaults);
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
