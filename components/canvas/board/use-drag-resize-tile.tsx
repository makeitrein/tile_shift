import { useCallback } from "react";
import { tileWidth } from "../../state/tile-defaults";
import { useSetTileDimensions } from "../../state/tile-utils";
import {
  articlePadding,
  tileHeaderHeight,
} from "../text-editor/wysiwig-editor";

export const useDragResizeTile = () => {
  const updateTile = useSetTileDimensions();

  return useCallback((ev) => {
    const target = ev.target as HTMLDivElement;
    const article = target.querySelector("article");

    if (article) {
      const minWidth = tileWidth;
      const minHeight =
        article.offsetHeight + articlePadding + tileHeaderHeight;
      const newWidth = Math.max(minWidth, ev.width);
      const newHeight = Math.max(minHeight, ev.height);

      updateTile(target.id, { width: newWidth, height: newHeight });

      target.style.width = `${newWidth}px`;
      target.style.height = `${newHeight}px`;
    }

    ev.target.style.transform = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
  }, []);
};
