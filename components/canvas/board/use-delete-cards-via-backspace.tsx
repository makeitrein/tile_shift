import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSetCardSettings } from "../../state/card-utils";
import * as cardState from "../../state/cards";
import { CardIds, selectedCardTargets } from "../../state/cards";

export const useDeleteCardsViaBackspace = () => {
  const setCards = useSetRecoilState(CardIds);
  const setSelectedCards = useSetRecoilState(selectedCardTargets);
  const selectedCardIds = useRecoilValue(cardState.selectedCardIds);
  const editableCardSettings = useRecoilValue(cardState.editableCardSettings);
  const setCardSettings = useSetCardSettings();

  useHotkeys(
    "ctrl+backspace,command+backspace",
    () => {
      selectedCardIds.forEach((cardId) =>
        setCardSettings(cardId, { deleted: true })
      );
      setSelectedCards([]);
    },
    [selectedCardIds, editableCardSettings]
  );
};
