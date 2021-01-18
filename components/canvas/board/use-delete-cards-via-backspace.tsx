import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  canvasCardDefaults,
  Card,
  selectedCanvasCardIds,
  selectedCanvasCardTargets,
  singleSelectedCanvasCard,
} from "../../state/cards";

export const useDeleteCardsViaBackspace = () => {
  const setCards = useSetRecoilState(canvasCardDefaults);
  const setSelectedCards = useSetRecoilState(selectedCanvasCardTargets);
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
