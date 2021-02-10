import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEventListener } from "../../general/hooks/useEventListener";
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

  const panCanvas = (e: WheelEvent) => {
    if (hoveringOverScrollable) {
      return;
    }

    const isPinchZoom = e.ctrlKey;
    const x = -e.deltaX;
    const y = -e.deltaY;

    e.preventDefault();

    if (isPinchZoom) {
      panzoom.zoomWithWheel(e);
    } else {
      panzoom.pan(x, y, { relative: true, force: true });
    }
  };

  useEventListener("mousewheel", panCanvas, canvasRef.current, false);

  useEventListener(
    "panzoomchange",
    () => {
      setTagPickerOpen(false);
    },
    canvasRef.current
  );

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
        console.log(event.target.classList);
        if (
          !disablePan &&
          Array.from(event.target.classList).includes("canvas-tile")
        ) {
          return false;
        }
      },
    });

    panzoom.pan(centerX, centerY, { force: true });
  }, []);

  useEffect(() => {
    panzoom.setOptions({ disablePan: disablePan });
  }, [disablePan]);
};
