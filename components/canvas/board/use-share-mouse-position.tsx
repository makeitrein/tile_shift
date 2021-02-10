import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as uiState from "../../state/ui";

export const useShareMousePosition = (canvasRef) => {
  const hoveringOverScrollable = useRecoilValue(uiState.hoveringOverScrollable);

  useEffect(() => {
    // useEventListener("mousemove", shareMousePosition, canvasRef.current);
    // canvasRef.current.addEventListener(
    //   "mousemove",
    //   (e: WheelEvent) => {
    //     if (hoveringOverScrollable) {
    //       return;
    //     }
    //     const x = e.offsetX;
    //     const y = e.offsetY;
    //   },
    //   { passive: false }
    // );
  }, []);
};
