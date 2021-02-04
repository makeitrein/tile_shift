import { useCallback } from "react";
import { useSetTileDimensions } from "../../state/tile-utils";

export const useDragResizeTile = () => {
  const updateTile = useSetTileDimensions();

  return useCallback((ev) => {
    const target = ev.target as HTMLDivElement;
    const article = target.querySelector("article");

    const minWidth = 140;
    const minHeight = article.offsetHeight;

    const newWidth = Math.max(minWidth, ev.width);
    const newHeight = Math.max(minHeight, ev.height);

    updateTile(target.id, { width: newWidth, height: newHeight });

    target.style.width = `${newWidth}px`;
    target.style.height = `${newHeight}px`;
    ev.target.style.transform = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
  }, []);
};