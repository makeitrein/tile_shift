import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { canvasCardDefaults } from "../../state/cards";
import { cardHeight, cardWidth } from "../card/canvas-card";

export const useAddCardViaClick = (canvasEditor) => {
  const setCards = useSetRecoilState(canvasCardDefaults);

  return useCallback((e: React.MouseEvent) => {
    const isCanvas = e.target === canvasEditor;
    if (!isCanvas) {
      return;
    }
    setCards((oldCards) => [
      ...oldCards,
      {
        id: "new-card-" + Math.random(),
        x: e.nativeEvent.offsetX - cardWidth / 3,
        y: e.nativeEvent.offsetY - cardHeight / 2,
      },
    ]);
  }, []);
};
