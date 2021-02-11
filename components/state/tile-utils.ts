import { DateTime } from "luxon";
import { useRecoilCallback } from "recoil";
import { tileHeight, tileWidth } from "../canvas/tile/tile";
import { generateTileRef, tileRef } from "./db";
import * as tileState from "./tiles";
import { Tile, TileDimensions } from "./tiles";

export const getISODateTime = () => DateTime.local().toString();

export const defaultTileValues: Tile = {
  id: "",
  x: 0,
  y: 0,
  width: tileWidth,
  height: tileHeight,
  content: "",
  isDragging: false,
  isWysiwygEditorFocused: false,
  tags: [],
  deleted: false,
  createdAt: getISODateTime(),
  collapsed: false,
};

export const useCreateInitialTile = () =>
  useRecoilCallback(({ set }) => {
    return ({
      dimensions,
      content = "",
      id,
      tags = ["Note"],
      collapsed = false,
    }: {
      dimensions?: Partial<TileDimensions>;
      content?: string;
      id?: string;
      tags?: string[];
      collapsed?: boolean;
    }) => {
      const ref = id ? tileRef(id) : generateTileRef();

      const tile = {
        ...defaultTileValues,
        content,
        id: ref.key,
        ...dimensions,
        tags,
        createdAt: getISODateTime(),
        collapsed,
      };

      ref.set(tile);
    };
  });

export const useSetTileDimensions = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, dimensions: Partial<TileDimensions>) => {
      set(tileState.tileDimensions(id), (tile) => ({
        ...tile,
        ...dimensions,
      }));
    };
  });

export const useSetTileSettings = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, settings: Partial<tileState.TileSettings>) => {
      set(tileState.tileSettings(id), (tile) => ({
        ...tile,
        ...settings,
      }));
    };
  });

export const useGetTileDimensions = () =>
  useRecoilCallback(({ snapshot }) => (id: string) => {
    return snapshot.getLoadable(tileState.tileDimensions(id)).getValue();
  });

export const syncStorageEffect = () => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === "get") {
    // Avoid expensive initialization
    setSelf([
      { id: "alpha", x: 0, y: 0, width: tileWidth },
      { id: "betta", x: 150, y: 150 },
      { id: "kenny", x: 350, y: 350 },
    ]); // Call synchronously to initialize
  }
};
