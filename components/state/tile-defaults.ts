import { TileContent, TileDimensions, TileSettings } from "./tiles";

export const tileWidth = 350;
export const tileHeight = 90;

export const defaultDimensions: TileDimensions = {
  x: 0,
  y: 0,
  width: tileWidth,
  height: tileHeight,
  expandedWidth: tileWidth,
  expandedHeight: tileHeight,
  updater: "",
};

export const defaultSettings: TileSettings = {
  isDragging: false,
  isWysiwygEditorFocused: false,
  tags: [],
  deleted: false,
  createdAt: new Date(),
  collapsed: false,
  updater: "",
};

export const defaultContent: TileContent = {
  content: "",
  updater: "",
};
