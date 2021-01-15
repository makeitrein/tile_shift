import { useEffect } from "react";
import { articlePadding } from "../card/wysiwig-editor";

export const useResizeCardEffect = (moveable) => {
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
  }, []);
};
