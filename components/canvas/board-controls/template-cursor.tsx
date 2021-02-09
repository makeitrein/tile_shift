import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React, { useCallback, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEventListener } from "../../general/hooks/useEventListener";
import { useCreateInitialArrow } from "../../state/arrow-utils";
import * as templateState from "../../state/template";
import { useCreateInitialTile } from "../../state/tile-utils";
import { TemplateDiagram } from "./template-diagram";

export const InjectTemplateCursor = () => {
  const selectedTemplate = useRecoilValue(templateState.selectedTemplateId);

  return selectedTemplate.replaceCursor ? <TempateCursor /> : null;
};

export const TempateCursor = () => {
  const cursorInnerRef = useRef(null);
  const [coords, setCoords] = useState({ x: null, y: null });

  const setSelectedTemplateId = useSetRecoilState(
    templateState.selectedTemplateId
  );

  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);

  const createInitialTile = useCreateInitialTile();
  const createInitialArrow = useCreateInitialArrow();

  const injectTemplateAtCursorPosition = useCallback(
    (e: MouseEvent) => {
      // const isCanvas = e.target === canvasEditor;
      // if (!isCanvas) {
      // return;
      // }

      const clickX = e.offsetX;
      const clickY = e.offsetY;

      const { tags, arrows } = selectedTemplate();

      const random = Math.random();

      const randomizedTileId = (id: number | string) =>
        "new-tile-" + id + random;

      tags.forEach((tag) => {
        const magicMultiplier = 6;
        const x = clickX - window.innerWidth + tag.x * magicMultiplier;
        const y = clickY - window.innerHeight + tag.y * magicMultiplier;
        createInitialTile({
          id: randomizedTileId(tag.id),
          dimensions: { x, y, width: 100, height: 50 },
          tags: [tag.name],
          collapsed: true,
        });
      });

      arrows.forEach(([startId, endId]) =>
        createInitialArrow({
          start: {
            tileId: randomizedTileId(startId),
            point: "right",
          },
          end: { tileId: randomizedTileId(endId), point: "left" },
        })
      );

      setSelectedTemplateId({ templateId: null, replaceCursor: null });
    },
    [selectedTemplate]
  );

  let endX = useRef(0);
  let endY = useRef(0);

  // Primary Mouse Move event
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current.style.top = clientY - 90 + "px";
    cursorInnerRef.current.style.left = clientX - 250 + "px";
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  useEventListener("mousemove", onMouseMove);
  useEventListener("click", injectTemplateAtCursorPosition);

  return coords.x && coords.y ? (
    <div className="absolute" ref={cursorInnerRef}>
      <TemplateDiagram />
    </div>
  ) : null;
};
