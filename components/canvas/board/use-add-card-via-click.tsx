import { useCallback } from "react";
import { useCreateInitialCard } from "../../state/card-utils";
import { cardHeight, cardWidth } from "../card/card";

export const useAddCardViaClick = (canvasEditor) => {
  const createInitialCard = useCreateInitialCard();

  return useCallback(
    (e: React.MouseEvent) => {
      const isCanvas = e.target === canvasEditor;
      if (!isCanvas) {
        return;
      }

      const dimensions = {
        x: e.nativeEvent.offsetX - cardWidth / 3,
        y: e.nativeEvent.offsetY - cardHeight / 2,
      };

      createInitialCard({ dimensions });
    },
    [canvasEditor]
  );
};
