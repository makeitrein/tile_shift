import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
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

  let now;
  let fps = 70;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

  const panZoomAnimationFrame = (e: WheelEvent) => {
    e.preventDefault();
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);

      requestAnimationFrame(() => panCanvas(e));
    }
  };

  const panCanvas = (e: WheelEvent) => {
    if (hoveringOverScrollable) {
      return;
    }

    e.preventDefault();

    const isPinchZoom = e.ctrlKey;
    const x = -e.deltaX;
    const y = -e.deltaY;

    if (isPinchZoom) {
      panzoom.zoomWithWheel(e, { step: 0.05 });
    } else {
      panzoom.pan(x, y, { relative: true, force: true });
    }
  };

  const debouncedSetTagPickerOpen = useCallback(
    debounce(() => setTagPickerOpen(false), 1000, {
      leading: true,
      trailing: false,
    }),
    []
  );

  useEventListener("mousewheel", panCanvas, canvasRef.current, false);

  useEventListener(
    "panzoomchange",
    () => debouncedSetTagPickerOpen(),
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
