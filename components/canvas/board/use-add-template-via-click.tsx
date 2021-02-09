import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCreateInitialArrow } from "../../state/arrow-utils";
import * as templateState from "../../state/template";
import { useCreateInitialTile } from "../../state/tile-utils";

export const useAddTemplateViaClick = (canvasEditor) => {
  const [selectedTemplateId, setSelectedTemplateId] = useRecoilState(
    templateState.selectedTemplateId
  );

  const selectedTemplate = useRecoilValue(templateState.selectedTemplate);

  const createInitialTile = useCreateInitialTile();
  const createInitialArrow = useCreateInitialArrow();

  return useCallback(
    (e: React.MouseEvent) => {
      console.log(selectedTemplateId.replaceCursor);
      if (!selectedTemplateId.replaceCursor) {
        return;
      }

      const isCanvas = e.target === canvasEditor;
      if (!isCanvas) {
        return;
      }

      const clickX = e.nativeEvent.offsetX;
      const clickY = e.nativeEvent.offsetY;

      const { tags, arrows, focalTagId } = selectedTemplate({
        x: clickX,
        y: clickY,
        multiplier: 5,
      });

      const focalTag = tags[focalTagId];
      const focalTagX = focalTag.x + clickX;
      const focalTagY = focalTag.y + clickY;

      console.log(focalTag);

      const random = Math.random();

      const randomizedTileId = (id: number | string) =>
        "new-tile-" + id + random;

      {
        Object.entries(tags).map(([id, { name, x, y }]) => {
          createInitialTile({
            id: randomizedTileId(id),
            dimensions: {
              x: x,
              y: y,
              width: 100,
              height: 20,
            },
            tags: [name],
            collapsed: true,
          });
        });
      }

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
    [selectedTemplate, selectedTemplateId.replaceCursor, canvasEditor]
  );
};
