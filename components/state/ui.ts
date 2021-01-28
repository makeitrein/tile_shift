import { atom } from "recoil";

export const discussionDrawer = atom({
  key: "UI/sidebar",
  default: {
    open: false,
    cardId: null,
  },
});
