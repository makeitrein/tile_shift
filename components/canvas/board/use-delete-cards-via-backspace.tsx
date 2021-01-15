import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  canvasCards,
  Card,
  selectedCanvasCardIds,
  selectedCanvasCards,
} from "../../state/canvas";

export const useDeleteCardsViaBackspace = () => {
  const setCards = useSetRecoilState(canvasCards);
  const setSelectedCards = useSetRecoilState(selectedCanvasCards);
  const selectedCardIds = useRecoilValue(selectedCanvasCardIds);

  const filterSelectedCards = (cards: Card[]) =>
    cards.filter((card) => !selectedCardIds.includes(card.id));

  useHotkeys(
    "backspace",
    () => {
      setCards(filterSelectedCards);
      setSelectedCards([]);
    },
    [selectedCardIds]
  );
};
