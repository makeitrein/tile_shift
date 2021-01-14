import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";
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

interface Card {
  id: string;
  x: number;
  y: number;
  theme: string;
  width: number;
  height: number;
  isDragging: boolean;
}

export const canvasCards = atom<Partial<Card>[]>({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [
    syncStorageEffect(),
    localStorageEffect(`canvas-card-ids`),
  ],
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
      return { id, theme, width, height, x, y, isDragging };
    },
  }),
  effects_UNSTABLE: (id) => [localStorageEffect(`canvas-card-${String(id)}`)],
});

export const canvasCardStyle = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/card-style",
  get: (id) => ({ get }) => {
    return colorThemes[get(canvasCard(id)).theme];
  },
});
