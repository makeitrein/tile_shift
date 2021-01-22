import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { colorThemes, ThemeMapOption } from "../canvas/card-menu/color-picker";
import { localStorageEffect } from "./effects";

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
  normalScroll: boolean;
}

export interface CardContent {
  content: string;
}

export type Card = { id: string } & CardDimensions & CardSettings & CardContent;

export const initialCardValues = atom<Record<string, Card>>({
  key: "CANVAS/initial-cards-query",
  default: {},
});

export const cardIds = selector<string[]>({
  key: "CANVAS/cards-ids",
  get: ({ get }) => {
    return Object.keys(get(initialCardValues));
  },
});

export const cardDimensions = atomFamily<CardDimensions, string>({
  key: "CANVAS/card-dimensions",
  default: selectorFamily({
    key: "CANVAS/card-dimensions-default",
    get: (id) => ({ get }) => {
      const cards = get(initialCardValues);
      const card = cards[id];

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
      const cards = get(initialCardValues);
      const card = cards[id];

      return {
        theme: card.theme,
        isDragging: false,
        isWysiwygEditorFocused: false,
        normalScroll: false,
      };
    },
  }),
});

export const cardContent = atomFamily<CardContent, string>({
  key: "CANVAS/card-content",
  default: selectorFamily({
    key: "CANVAS/card-content-default",
    get: (id) => ({ get }) => {
      const cards = get(initialCardValues);
      const card = cards[id];

      return {
        content: card.content,
      };
    },
  }),
});

// Provides default data for each initial canvas card, does not contain up-to-date data
export const CardIds = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [localStorageEffect(`canvas-card-ids`)],
});

// // The actual card data found via the atomFamily
// export const Cards = selector<Card[]>({
//   key: "CANVAS/canvas-cards",
//   get: ({ get }) => {
//     const cardDefaults = get(CardIds);
//     return cardDefaults.map((card) => get(Card(card.id)));
//   },
// });

// HTML DOM targets that moveable interacts with
export const selectedCardTargets = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-card-targets",
  default: [],
});

// IDs that correspond to both a DOM card and Card
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
    const ids = get(selectedCardIds);
    return ids.length === 1 ? ids[0] : null;
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
