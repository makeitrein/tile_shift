import { atom } from "recoil";

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
  key: "CANVAS/card",
  default: [],
  effects_UNSTABLE: [syncStorageEffect()],
});

// export const canvasCard = atomFamily({
//   key: "CANVAS/card",
//   default: ({ id, x = 0, y = 0 }) => ({
//     id,
//     x,
//     y,
//   }),
// });
