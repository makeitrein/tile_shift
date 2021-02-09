import { atom } from "recoil";

export const panZoomState = atom({
  key: "UI/pan",
  default: {
    x: 0,
    y: 0,
    scale: 1,
  },
});

export const tagPickerOpen = atom({
  key: "UI/tag-picker-open",
  default: false,
});

export const disablePan = atom({
  key: "UI/disable-pan",
  default: true,
});

export const hoveringOverScrollable = atom({
  key: "UI/hover-over-scrollable",
  default: false,
});

export const mousePosition = atom({
  key: "UI/mouse-position",
  default: {},
});
