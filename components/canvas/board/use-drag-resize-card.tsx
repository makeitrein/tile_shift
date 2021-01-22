import { useCallback } from "react";
import { useSetCardDimensions } from "../../state/card-utils";

export const useDragResizeCard = () => {
  const updateCard = useSetCardDimensions();

  return useCallback((ev) => {
    const target = ev.target as HTMLDivElement;
    const article = target.querySelector("article");

    const minWidth = 140;
    const minHeight = article.offsetHeight;

    const newWidth = Math.max(minWidth, ev.width);
    const newHeight = Math.max(minHeight, ev.height);

    updateCard(target.id, { width: newWidth, height: newHeight });

    target.style.width = `${newWidth}px`;
    target.style.height = `${newHeight}px`;
    ev.target.style.transform = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
  }, []);
};
