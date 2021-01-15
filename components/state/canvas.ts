import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilCallback,
} from "recoil";
import { cardHeight, cardWidth } from "../canvas/card/canvas-card";
import { colorThemes, ThemeMapOption } from "../canvas/card/color-picker";

const syncStorageEffect = () => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === "get") {
    // Avoid expensive initialization
    setSelf([
      { id: "alpha", x: 0, y: 0 },
      { id: "betta", x: 150, y: 150 },
      { id: "kenny", x: 350, y: 350 },
    ]); // Call synchronously to initialize
  }
};

const syncCardChanges = (id) => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  setInterval(() => {
    setSelf((card) => {
      console.log(card);
      return { ...card };
    });
  }, 1000);
};

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (!process.browser) {
    return;
  }
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

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

export const canvasCards = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [
    syncStorageEffect(),
    localStorageEffect(`canvas-card-ids`),
  ],
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
    key: "MyAtom/Default",
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

export const useUpdateCard = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, data: Object) => {
      set(canvasCard(id), (card) => ({
        ...card,
        ...data,
      }));
    };
  });

export const useGetCard = () =>
  useRecoilCallback(({ snapshot }) => (id: string) => {
    return snapshot.getLoadable(canvasCard(id)).contents;
  });

export const canvasCardColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/card-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(canvasCard(id)).theme];
  },
});
