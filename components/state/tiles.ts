import { atom, atomFamily, selector } from "recoil";
import { syncData, syncIds, tileRef, tilesRef } from "./db";
export interface TileDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
  expandedWidth?: number;
  expandedHeight?: number;
}
export interface TileSettings {
  isDragging: boolean;
  tags: string[];
  isWysiwygEditorFocused: boolean;
  deleted: boolean;
  createdAt: Date;
  collapsed: boolean;
}

export interface Id {
  id: string;
}
export interface TileContent {
  content: string;
}

export type Tile = Id & TileDimensions & TileSettings & TileContent;

export type TileSearchResult = TileContent & TileSettings & Id;

export const initialTileValues = atom<Record<string, Tile>>({
  key: "CANVAS/initial-tiles-query",
  default: {},
  // effects_UNSTABLE: [syncInitialitemValues],
});

export const discussionDrawer = atom({
  key: "CANVAS/discussion-drawer",
  default: {
    open: false,
    tileId: null,
  },
});

export const discussionDrawerTile = selector<TileSearchResult | null>({
  key: "CANVAS/discussion-drawer-tile",
  get: ({ get }) => {
    const { tileId } = get(discussionDrawer);

    if (!tileId) {
      return null;
    }

    return {
      id: tileId,
      ...get(tileContent(tileId)),
      ...get(tileSettings(tileId)),
    };
  },
});

export const searchedForTile = atom<null | string>({
  key: "CANVAS/searched-for-tile",
  default: null,
});

export const tileIds = atom<string[]>({
  key: "CANVAS/tiles-ids",
  default: [],
  effects_UNSTABLE: [syncIds(tilesRef())],
});

export const undeletedTileIds = selector<string[]>({
  key: "CANVAS/undeleted-tiles-ids",
  get: ({ get }) => {
    return get(tileIds).filter((id) => !get(tileSettings(id)).deleted);
  },
});

export const tileSearchResults = selector<TileSearchResult[]>({
  key: "CANVAS/all-tile-content-ids",
  get: ({ get }) => {
    return get(tileIds).map((id) => ({
      id: id,
      ...get(tileContent(id)),
      ...get(tileSettings(id)),
    }));
  },
});

export const tileDimensions = atomFamily<TileDimensions, string>({
  key: "CANVAS/tile-dimensions",
  effects_UNSTABLE: (tileId) => [
    syncData(tileRef(tileId), ["x", "y", "width", "height"]),
  ],
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const tileSettings = atomFamily<TileSettings, string>({
  key: "CANVAS/tile-settings",
  effects_UNSTABLE: (tileId) => [
    syncData(tileRef(tileId), [
      "tags",
      "isDragging",
      "isWysiwygEditorFocused",
      "deleted",
      "createdAt",
      "collapsed",
    ]),
  ],
  default: {
    tags: [],
    isDragging: false,
    isWysiwygEditorFocused: false,
    deleted: false,
    createdAt: new Date(),
    collapsed: false,
  },
});

export const tileContent = atomFamily<TileContent, string>({
  key: "CANVAS/tile-content",
  effects_UNSTABLE: (tileId) => [syncData(tileRef(tileId), ["content"])],
  default: {
    content: "",
  },
});

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
