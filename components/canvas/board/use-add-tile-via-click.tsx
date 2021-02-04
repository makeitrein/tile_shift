import { useCallback } from "react";
import { useCreateInitialTile } from "../../state/tile-utils";
import { tileHeight, tileWidth } from "../tile/tile";

export const useAddTileViaClick = (canvasEditor) => {
  const createInitialTile = useCreateInitialTile();

  return useCallback(
    (e: React.MouseEvent) => {
      const isCanvas = e.target === canvasEditor;
      if (!isCanvas) {
        return;
      }

      const dimensions = {
        x: e.nativeEvent.offsetX - tileWidth / 3,
        y: e.nativeEvent.offsetY - tileHeight / 2,
      };

      createInitialTile({ dimensions });
    },
    [canvasEditor]
  );
};
