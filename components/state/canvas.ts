import { atom, atomFamily, selectorFamily } from "recoil";
import { colorThemes } from "../canvas/card/color-picker";

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

export const canvasCards = atom({
  key: "CANVAS/cards",
  default: [],
  effects_UNSTABLE: [syncStorageEffect()],
});

export const canvasCard = atomFamily({
  key: "CANVAS/card",
  default: selectorFamily({
    key: "MyAtom/Default",
    get: (id) => ({ get }) => {
      const cards = get(canvasCards);
      const card = cards.find((card) => card.id === id) || {};

      const theme = card.theme || "white";
      const width = card.width || 140;
      const height = card.height || 100;

      const x = card.x || 0;
      const y = card.y || 0;

      const isDragging = card.isDragging || false;
      return { theme, width, height, x, y, isDragging };
    },
  }),
});

export const canvasCardStyle = selectorFamily({
  key: "CANVAS/card-style",
  get: (id) => ({ get }) => {
    return colorThemes[get(canvasCard(id)).theme];
  },
});
