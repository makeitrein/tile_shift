import Panzoom from "@panzoom/panzoom";
import { useEffect } from "react";

export const usePanzoomEffects = ({
  panzoom,
  panzoomRef,
  canvasEditorRef,
  disablePan,
  range,
}) => {
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(canvasEditorRef.current, {
      disablePan: disablePan,
      canvas: true,
      contain: "outside",
      maxScale: 1,
      minScale: 0.1,
      handleStartEvent: (event) => {
        if (
          !disablePan &&
          Array.from(event.target.classList).includes("canvas-card")
        ) {
          throw "disable panning hack";
        }
      },
    });

    window.addEventListener(
      "mousewheel",
      (e) => {
        const isPinchZoom = e.ctrlKey;

        e.preventDefault();

        if (isPinchZoom) {
          panzoom.zoomWithWheel(e);
          if (range.current) range.current.value = panzoom.getScale() + "";
        } else {
          const x = -e.deltaX;
          const y = -e.deltaY;
          panzoom.pan(x, y, { relative: true, force: true });
        }
      },
      { passive: false }
    );

    // canvasEditorRef.current.addEventListener("panzoomzoom", ({ detail }) => {
    //   if (detail.scale < 0.5) {
    //     setZoom(2);
    //   } else if (detail.scale < 1) {
    //     setZoom(1.5);
    //   } else {
    //     setZoom(1);
    //   }
    // });
  }, []);

  useEffect(() => {
    panzoom.setOptions({ disablePan: disablePan });
  }, [disablePan]);
};
