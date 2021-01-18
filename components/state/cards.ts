import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { colorThemes, ThemeMapOption } from "../canvas/card/color-picker";
import { localStorageEffect } from "./utils";

export interface CardDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface CardSettings {
  theme: string;
  isDragging: boolean;
  isWysiwygEditorFocused: boolean;
}

export interface CardContent {
  content: string;
}

export type Card = { id: string } & CardDimensions & CardSettings & CardContent;

export type ArrowPoint = "w" | "e" | "s" | "n";
export type ArrowEnd = "w" | "e" | "s" | "n";
export interface Arrow {
  id: string;
  start: { cardId: string; point: ArrowPoint };
  end: { cardId: string; point: ArrowPoint };
}

export const initialCardsQuery = atom({
  key: "CANVAS/initial-cards-query",
  default: [],
});

export const cardIds = atom<string[]>({
  key: "CANVAS/cards-ids",
  default: selector({
    key: "CANVAS/card-ids-default",
    get: ({ get }) => {
      return get(initialCardsQuery).map((card) => card.id);
    },
  }),
});

export const cardDimensions = atomFamily<CardDimensions, string>({
  key: "CANVAS/card-dimensions",
  default: selectorFamily({
    key: "CANVAS/card-dimensions-default",
    get: (id) => ({ get }) => {
      const cards = get(initialCardsQuery);

      const card = cards.find((card) => card.id === id);

      return {
        x: card.x,
        y: card.y,
        width: card.width,
        height: card.height,
      };
    },
  }),
});

export const cardSettings = atomFamily<CardSettings, string>({
  key: "CANVAS/card-settings",
  default: selectorFamily({
    key: "CANVAS/card-settings-default",
    get: (id) => ({ get }) => {
      const cards = get(initialCardsQuery);

      const card = cards.find((card) => card.id === id);

      return {
        theme: card.theme,
        isDragging: false,
        isWysiwygEditorFocused: false,
      };
    },
  }),
});

export const cardContent = atomFamily<CardContent, string>({
  key: "CANVAS/card-content",
  default: selectorFamily({
    key: "CANVAS/card-content-default",
    get: (id) => ({ get }) => {
      const cards = get(initialCardsQuery);

      const card = cards.find((card) => card.id === id);

      return {
        content: card.content,
      };
    },
  }),
});

// Provides default data for each initial canvas card, does not contain up-to-date data
export const canvasCardIds = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [localStorageEffect(`canvas-card-ids`)],
});

// // The actual card data found via the atomFamily
// export const canvasCards = selector<Card[]>({
//   key: "CANVAS/canvas-cards",
//   get: ({ get }) => {
//     const cardDefaults = get(canvasCardIds);
//     return cardDefaults.map((card) => get(canvasCard(card.id)));
//   },
// });

// HTML DOM targets that moveable interacts with
export const selectedCardTargets = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-card-targets",
  default: [],
});

// IDs that correspond to both a DOM card and canvasCard
export const selectedCardIds = selector<string[]>({
  key: "CANVAS/selected-card-ids",
  get: ({ get }) => {
    const cards = get(selectedCardTargets);
    return cards.map((card) => card.id);
  },
});

export const editableCardId = selector<string | null>({
  key: "CANVAS/editable-card-id",
  get: ({ get }) => {
    const cards = get(selectedCardIds);
    return cards.length === 1 ? cards[0] : null;
  },
});

export const editableCardDimensions = selector<CardDimensions | null>({
  key: "CANVAS/editable-card-dimensions",
  get: ({ get }) => {
    const id = get(editableCardId);
    return id ? get(cardDimensions(id)) : null;
  },
});

export const editableCardSettings = selector<CardSettings | null>({
  key: "CANVAS/editable-card-settings",
  get: ({ get }) => {
    const id = get(editableCardId);
    return id ? get(cardSettings(id)) : null;
  },
});

export const editableCardContent = selector<CardContent | null>({
  key: "CANVAS/editable-card-content",
  get: ({ get }) => {
    const id = get(editableCardId);
    return id ? get(cardContent(id)) : null;
  },
});

export const cardColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/card-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(cardSettings(id)).theme];
  },
});
