import { useEffect } from "react";

export const useDeleteTextEffect = (selectedTileIds) => {
  useEffect(() => {
    window.getSelection().removeAllRanges();
  }, [selectedTileIds]);
};
