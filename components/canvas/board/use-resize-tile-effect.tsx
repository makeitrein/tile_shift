import { useEffect } from "react";
import { articlePadding } from "../text-editor/wysiwig-editor";

export const useResizeTileEffect = (moveable) => {
  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (!moveable) return;

      const target = e.target as HTMLDivElement;

      const articleHeight = target.offsetHeight + articlePadding;

      const rect = moveable.getRect();

      if (target.isContentEditable && rect.offsetHeight <= articleHeight) {
        moveable.request("resizable", {
          offsetHeight: articleHeight + articlePadding,
          isInstant: true,
        });
      }
    });
  }, [moveable]);
};
