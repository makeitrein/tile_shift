import { atom } from "recoil";

const syncStorageEffect = () => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === "get") {
    // Avoid expensive initialization
    setSelf(["alpha", "betta", "kenny"]); // Call synchronously to initialize
  }
};

export const canvasCardIds = atom({
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
