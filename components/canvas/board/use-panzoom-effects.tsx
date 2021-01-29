import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { panZoomState } from "../../state/ui";
import { totalCanvasPixelSize } from "./board";
import Panzoom from "./panzoom/panzoom";

export const usePanzoomEffects = ({
  panzoom,
  panzoomRef,
  canvasEditorRef,
  disablePan,
  range,
}) => {
  const setPanZoomState = useSetRecoilState(panZoomState);

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
        maxScale: 1.5,
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

    const { x, y } = panzoom.getPan();
    const scale = panzoom.getScale();
    setPanZoomState({ x, y, scale });

    window.addEventListener(
      "mousewheel",
      (e) => {
        const isPinchZoom = e.ctrlKey;

        e.preventDefault();

        if (isPinchZoom) {
          panzoom.zoomWithWheel(e);
        } else {
          const x = -e.deltaX;
          const y = -e.deltaY;
          panzoom.pan(x, y, { relative: true, force: true });
        }

        // const { x, y } = panzoom.getPan();
        // const scale = panzoom.getScale();
        // setTimeout(() => setPanZoomState({ x, y, scale }), 100);
      },
      { passive: false }
    );

    // canvasEditorRef.current.addEventListener("panzoomchange", ({ detail }) => {
    //   const { x, y, scale } = detail;
    //   console.log({ x, y, scale });

    //   // setTimeout(() => setPanZoomState({ x, y, scale }), 100);
    // });
  }, []);

  useEffect(() => {
    panzoom.setOptions({ disablePan: disablePan });
  }, [disablePan]);
};
