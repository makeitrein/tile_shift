import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSetTileSettings } from "../../state/tile-utils";
import * as tileState from "../../state/tiles";
import { selectedTileTargets } from "../../state/tiles";

export const useDeleteTilesViaBackspace = () => {
  const setSelectedTiles = useSetRecoilState(selectedTileTargets);
  const selectedTileIds = useRecoilValue(tileState.selectedTileIds);
  const editableTileSettings = useRecoilValue(tileState.editableTileSettings);
  const setTileSettings = useSetTileSettings();

  useHotkeys(
    "backspace",
    () => {
      if (editableTileSettings?.isWysiwygEditorFocused) {
        return;
      }
      selectedTileIds.forEach((tileId) =>
        setTileSettings(tileId, { deleted: true })
      );
      setSelectedTiles([]);
    },
    [selectedTileIds, editableTileSettings]
  );
};
