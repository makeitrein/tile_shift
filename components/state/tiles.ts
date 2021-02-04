import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { colorThemes, ThemeMapOption } from "../canvas/tile-menu/color-picker";
import { localStorageEffect } from "./effects";

export interface TileDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface TileSettings {
  theme: string;
  isDragging: boolean;
  tags: string[];
  isWysiwygEditorFocused: boolean;
  normalScroll: boolean;
  deleted: boolean;
}

export interface TileContent {
  content: string;
}

export type Tile = { id: string } & TileDimensions & TileSettings & TileContent;

export const initialTileValues = atom<Record<string, Tile>>({
  key: "CANVAS/initial-tiles-query",
  default: {},
});

export const discussionTileId = atom<null | string>({
  key: "CANVAS/discussion-tile-id",
  default: null,
});

export const searchedForTile = atom<null | string>({
  key: "CANVAS/searched-for-tile",
  default: null,
});

export const tileIds = selector<string[]>({
  key: "CANVAS/tiles-ids",
  get: ({ get }) => {
    return Object.keys(get(initialTileValues));
  },
});

export const undeletedTileIds = selector<string[]>({
  key: "CANVAS/undeleted-tiles-ids",
  get: ({ get }) => {
    return get(tileIds).filter((id) => !get(tileSettings(id)).deleted);
  },
});

export const allTileData = selector<Tile[]>({
  key: "CANVAS/all-tile-content-ids",
  get: ({ get }) => {
    return get(tileIds).map((id) => ({
      id: id,
      ...get(tileContent(id)),
      ...get(tileSettings(id)),
      ...get(tileDimensions(id)),
    }));
  },
});

export const tileDimensions = atomFamily<TileDimensions, string>({
  key: "CANVAS/tile-dimensions",
  default: selectorFamily({
    key: "CANVAS/tile-dimensions-default",
    get: (id) => ({ get }) => {
      const tiles = get(initialTileValues);
      const tile = tiles[id];

      return {
        x: tile.x,
        y: tile.y,
        width: tile.width,
        height: tile.height,
      };
    },
  }),
});

export const tileSettings = atomFamily<TileSettings, string>({
  key: "CANVAS/tile-settings",
  default: selectorFamily({
    key: "CANVAS/tile-settings-default",
    get: (id) => ({ get }) => {
      const tiles = get(initialTileValues);
      const tile = tiles[id];

      return {
        theme: tile.theme,
        tags: [],
        isDragging: false,
        isWysiwygEditorFocused: false,
        normalScroll: false,
      };
    },
  }),
});

export const tileContent = atomFamily<TileContent, string>({
  key: "CANVAS/tile-content",
  default: selectorFamily({
    key: "CANVAS/tile-content-default",
    get: (id) => ({ get }) => {
      const tiles = get(initialTileValues);
      const tile = tiles[id];

      return {
        content: tile.content,
      };
    },
  }),
});

// Provides default data for each initial canvas tile, does not contain up-to-date data
export const TileIds = atom<Partial<Tile>[]>({
  key: "CANVAS/tiles",
  default: [],
  effects_UNSTABLE: [localStorageEffect(`canvas-tile-ids`)],
});

// // The actual tile data found via the atomFamily
// export const Tiles = selector<Tile[]>({
//   key: "CANVAS/canvas-tiles",
//   get: ({ get }) => {
//     const tileDefaults = get(TileIds);
//     return tileDefaults.map((tile) => get(Tile(tile.id)));
//   },
// });

// HTML DOM targets that moveable interacts with
export const selectedTileTargets = atom<(HTMLElement | SVGElement)[]>({
  key: "CANVAS/selected-tile-targets",
  default: [],
});

// IDs that correspond to both a DOM tile and Tile
export const selectedTileIds = selector<string[]>({
  key: "CANVAS/selected-tile-ids",
  get: ({ get }) => {
    const tiles = get(selectedTileTargets);
    return tiles.map((tile) => tile.id);
  },
});

export const editableTileId = selector<string | null>({
  key: "CANVAS/editable-tile-id",
  get: ({ get }) => {
    const ids = get(selectedTileIds);
    return ids.length === 1 ? ids[0] : null;
  },
});

export const editableTileDimensions = selector<TileDimensions | null>({
  key: "CANVAS/editable-tile-dimensions",
  get: ({ get }) => {
    const id = get(editableTileId);
    return id ? get(tileDimensions(id)) : null;
  },
});

export const editableTileSettings = selector<TileSettings | null>({
  key: "CANVAS/editable-tile-settings",
  get: ({ get }) => {
    const id = get(editableTileId);
    return id ? get(tileSettings(id)) : null;
  },
});

export const editableTileContent = selector<TileContent | null>({
  key: "CANVAS/editable-tile-content",
  get: ({ get }) => {
    const id = get(editableTileId);
    return id ? get(tileContent(id)) : null;
  },
});

export const tileColorTheme = selectorFamily<ThemeMapOption, string>({
  key: "CANVAS/tile-color-theme",
  get: (id) => ({ get }) => {
    return colorThemes[get(tileSettings(id)).theme];
  },
});