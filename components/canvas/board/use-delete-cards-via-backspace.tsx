import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  canvasCards,
  Card,
  selectedCanvasCardIds,
  selectedCanvasCards,
  singleSelectedCanvasCard,
} from "../../state/cards";

export const useDeleteCardsViaBackspace = () => {
  const setCards = useSetRecoilState(canvasCards);
  const setSelectedCards = useSetRecoilState(selectedCanvasCards);
  const selectedCardIds = useRecoilValue(selectedCanvasCardIds);
  const singleSelectedCard = useRecoilValue(singleSelectedCanvasCard);

  const filterSelectedCards = (cards: Card[]) =>
    cards.filter((card) => !selectedCardIds.includes(card.id));

  useHotkeys(
    "backspace",
    () => {
      if (!singleSelectedCard?.isWysiwygEditorFocused) {
        setCards(filterSelectedCards);
        setSelectedCards([]);
      }
    },
    [selectedCardIds, singleSelectedCard]
  );
};
