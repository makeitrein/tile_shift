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

      const { tags, arrows } = selectedTemplate();

      const random = Math.random();

      const randomizedTileId = (id: number | string) =>
        "new-tile-" + id + random;

      tags.forEach((tag) => {
        const magicMultiplier = 6;
        const x = clickX + tag.x * magicMultiplier;
        const y = clickY + tag.y * magicMultiplier;
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
    [selectedTemplate, selectedTemplateId.replaceCursor, canvasEditor]
  );
};
