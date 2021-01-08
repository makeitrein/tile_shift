import { atom, atomFamily, selectorFamily } from "recoil";

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
      return cards.find((card) => card.id === id);
    },
  }),
});
