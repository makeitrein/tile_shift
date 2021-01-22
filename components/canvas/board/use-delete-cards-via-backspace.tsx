import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as cardState from "../../state/cards";
import { Card, CardIds, selectedCardTargets } from "../../state/cards";

export const useDeleteCardsViaBackspace = () => {
  const setCards = useSetRecoilState(CardIds);
  const setSelectedCards = useSetRecoilState(selectedCardTargets);
  const selectedCardIds = useRecoilValue(cardState.selectedCardIds);
  const editableCardSettings = useRecoilValue(cardState.editableCardSettings);

  const filterSelectedCards = (cards: Card[]) =>
    cards.filter((card) => !selectedCardIds.includes(card.id));

  useHotkeys(
    "backspace",
    () => {
      if (!editableCardSettings?.isWysiwygEditorFocused) {
        setCards(filterSelectedCards);
        setSelectedCards([]);
      }
    },
    [selectedCardIds, editableCardSettings]
  );
};
