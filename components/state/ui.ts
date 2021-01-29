import { atom } from "recoil";

export const discussionDrawer = atom({
  key: "UI/sidebar",
  default: {
    open: false,
    cardId: null,
  },
});

export const panZoomState = atom({
  key: "UI/pan",
  default: {
    x: 0,
    y: 0,
    scale: 1,
  },
});
