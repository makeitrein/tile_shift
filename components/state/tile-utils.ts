import { DateTime } from "luxon";
import { useRecoilCallback } from "recoil";
import {
  generateTileId,
  setTileContentRef,
  setTileDimensionsRef,
  setTileSettingsRef,
} from "./db";
import {
  defaultContent,
  defaultDimensions,
  defaultSettings,
} from "./tile-defaults";
import * as tileState from "./tiles";
import { TileDimensions } from "./tiles";

export const getISODateTime = () => DateTime.local().toString();

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
      const tileId = id || generateTileId();

      setTileDimensionsRef(tileId, { ...defaultDimensions, ...dimensions });
      setTileSettingsRef(tileId, { ...defaultSettings, tags, collapsed });
      setTileContentRef(tileId, { ...defaultContent, content });
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
