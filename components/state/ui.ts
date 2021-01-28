import { atom } from "recoil";

export const sidebarDrawer = atom({
  key: "UI/sidebar",
  default: {
    open: false,
    cardId: null,
  },
});
