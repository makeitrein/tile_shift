import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as uiState from "../../state/ui";
import { tagPickerOpen } from "../../state/ui";
import { totalCanvasPixelSize } from "./board";
import Panzoom from "./panzoom/panzoom";

export const usePanzoomEffects = ({
  panzoom,
  panzoomRef,
  canvasRef,
  disablePan,
  range,
}) => {
  const setTagPickerOpen = useSetRecoilState(tagPickerOpen);
  const hoveringOverScrollable = useRecoilValue(uiState.hoveringOverScrollable);

  useEffect(() => {
    const maxX = totalCanvasPixelSize - window.innerWidth * 1.5;
    const maxY = totalCanvasPixelSize - window.innerHeight * 1.5;
    const centerX = -maxX / 2;
    const centerY = -maxY / 2;

    panzoom = panzoomRef.current = Panzoom(canvasRef.current, {
      disablePan: disablePan,
      canvas: true,
      contain: "outside",
      maxScale: 1.5,
      minScale: 0.1,
      startX: centerX,
      startY: centerY,
      handleStartEvent: (event) => {
        if (
          !disablePan &&
          Array.from(event.target.classList).includes("canvas-tile")
        ) {
          throw "disable panning hack";
        }
      },
    });

    panzoom.pan(centerX, centerY, { force: true });

    canvasRef.current.addEventListener(
      "mousewheel",
      (e: WheelEvent) => {
        if (hoveringOverScrollable) {
          return;
        }

        const isPinchZoom = e.ctrlKey;
        const x = -e.deltaX;
        const y = -e.deltaY;

        e.preventDefault();

        if (isPinchZoom) {
          // e.stopPropagation();
          panzoom.zoomWithWheel(e);
        } else {
          panzoom.pan(x, y, { relative: true, force: true });
        }

        // const { x, y } = panzoom.getPan();
        // const scale = panzoom.getScale();
        // setTimeout(() => setPanZoomState({ x, y, scale }), 100);
      },
      { passive: false }
    );

    canvasRef.current.addEventListener("panzoomchange", () => {
      setTagPickerOpen(false);
    });
  }, []);

  useEffect(() => {
    panzoom.setOptions({ disablePan: disablePan });
  }, [disablePan]);
};
