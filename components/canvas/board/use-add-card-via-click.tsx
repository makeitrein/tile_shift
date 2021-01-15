import { useSetRecoilState } from "recoil";
import { canvasCards } from "../../state/canvas";
import { cardHeight, cardWidth } from "../card/canvas-card";

export const useAddCardViaClick = (canvasEditor) => {
  const setCards = useSetRecoilState(canvasCards);

  return (e: React.MouseEvent) => {
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
  };
};
