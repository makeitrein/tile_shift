import { useEffect } from "react";
import { totalCanvasPixelSize } from "./board";
import Panzoom from "./panzoom/panzoom";

export const usePanzoomEffects = ({
  panzoom,
  panzoomRef,
  canvasEditorRef,
  disablePan,
  range,
}) => {
  useEffect(() => {
    // works for 1
    // const maxX = totalCanvasPixelSize - window.innerWidth * 1.5;
    // const maxY = totalCanvasPixelSize - window.innerHeight * 1.5;
    // const centerX = -maxX / 2;
    // const centerY = -maxY / 2;

    const maxX = totalCanvasPixelSize - window.innerWidth * 1.5;
    const maxY = totalCanvasPixelSize - window.innerHeight * 1.5;
    const centerX = -maxX / 2;
    const centerY = -maxY / 2;

    window.panzoom = panzoom = panzoomRef.current = Panzoom(
      canvasEditorRef.current,
      {
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
      }
    );

    panzoom.pan(centerX, centerY, { force: true });

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
