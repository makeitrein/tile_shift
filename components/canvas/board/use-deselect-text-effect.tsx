import { useEffect } from "react";

export const useDeleteTextEffect = (selectedCardIds) => {
  useEffect(() => {
    window.getSelection().removeAllRanges();
  }, [selectedCardIds]);
};
